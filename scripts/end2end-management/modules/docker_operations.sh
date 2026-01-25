#!/bin/bash

# =============================================================================
# OPERACIONES DOCKER - End2End Tests Management  
# =============================================================================
# Este módulo maneja todas las operaciones relacionadas con Docker:
# - Construcción de contenedores
# - Verificación de imágenes existentes
# - Ejecución de contenedores para tests
# - Limpieza de recursos Docker
#
# Autor: Jose Guillermo Moreu (joseguillermomoreu@gmail.com)
# Última actualización: $(date '+%d de %B de %Y')
# =============================================================================

# Función helper para construir el comando correcto de Playwright
build_playwright_command() {
    local test_tag="$1"
    local logs_env="$2"
    local workers_option="$3"
    local headed_option="$4"
    local update_option="$5"
    
    local base_cmd="npx playwright test"
    local target_arg=""
    
    # Determinar si es directorio o tag/regex
    if [ "$CUSTOM_TAG_TYPE" = "directory" ]; then
        # Es un directorio o archivo - usar como argumento directo
        target_arg="$test_tag"
    else
        # Es un tag, regex o legado - usar con --grep
        target_arg="--grep \"$test_tag\""
    fi
    
    # Construir comando completo
    local full_cmd="$logs_env $base_cmd $target_arg $workers_option $headed_option $update_option"
    
    # Limpiar espacios extra
    echo "$full_cmd" | tr -s ' '
}

# Función para verificar si existe la imagen Docker
check_docker_image_exists() {
    local image_name="${1:-$DOCKER_IMAGE_NAME}"
    
    if docker image inspect "$image_name" >/dev/null 2>&1; then
        return 0  # La imagen existe
    else
        return 1  # La imagen no existe
    fi
}

# Función para construir la imagen Docker
build_docker_image() {
    local image_name="${1:-$DOCKER_IMAGE_NAME}"
    local force_build="${2:-false}"
    
    show_status "Construyendo contenedor Docker..."
    show_command "docker build -t $image_name ."
    
    if docker build -t "$image_name" .; then
        show_success "Contenedor construido exitosamente"
        export CONTAINER_BUILT=true
        return 0
    else
        show_error "Error al construir el contenedor"
        return 1
    fi
}

# Función para manejar la construcción del contenedor según el contexto
handle_docker_container_build() {
    local image_name="${1:-$DOCKER_IMAGE_NAME}"
    
    # Si se cambió el entorno, es obligatorio reconstruir
    if [ "$ENVIRONMENT_CHANGED" = true ]; then
        show_warning "Se cambió el entorno. Es necesario reconstruir el contenedor."
        if ! build_docker_image "$image_name"; then
            exit 1
        fi
    else
        # Preguntar si quiere construir
        show_section_title "¿Deseas construir el contenedor Docker?"
        read -p "Construir contenedor (s/N): " BUILD_CONTAINER
        
        if [[ "$BUILD_CONTAINER" =~ ^[Ss]$ ]]; then
            if ! build_docker_image "$image_name"; then
                exit 1
            fi
        else
            show_info "Saltando construcción del contenedor"
        fi
    fi
    
    echo ""
}

# Función para verificar o construir imagen para tests
ensure_docker_image_for_tests() {
    local image_name="${1:-$DOCKER_IMAGE_NAME}"
    
    if check_docker_image_exists "$image_name"; then
        show_success "Imagen Docker '$image_name' encontrada"
        
        if [ "$CONTAINER_BUILT" = true ]; then
            show_info "Usando imagen recién construida"
        else
            show_info "Usando imagen existente"
        fi
        return 0
    else
        show_warning "La imagen Docker '$image_name' no existe."
        show_section_title "¿Deseas construir la imagen ahora?"
        read -p "Construir imagen (S/n): " BUILD_FOR_TESTS
        
        if [[ "$BUILD_FOR_TESTS" =~ ^[Nn]$ ]]; then
            show_error "No se puede ejecutar tests sin la imagen Docker. Saltando ejecución."
            return 1
        else
            show_status "Construyendo imagen Docker para los tests..."
            if build_docker_image "$image_name"; then
                return 0
            else
                return 1
            fi
        fi
    fi
}

# Función para crear script temporal para ejecutar dentro del contenedor
create_container_script() {
    local script_path="$1"
    local test_tag="$2"
    local logs_env="$3"
    local workers_option="$4"
    local headed_option="$5"
    
    # Determinar el comando correcto usando la función helper
    local COMMAND=$(build_playwright_command "$test_tag" "$logs_env" "$workers_option" "$headed_option" "")
    
    cat > "$script_path" << EOF
#!/bin/bash
echo -e "\033[0;32m✓ Dentro del contenedor Docker\033[0m"

if [ "$test_tag" = "@" ]; then
    echo -e "\033[0;33m⚠️  Ejecutando '@' para descubrir todos los tags (fallará intencionadamente)\033[0m"
fi

echo -e "\033[1;33mEjecutando: $COMMAND\033[0m"
eval $COMMAND

echo ""
if [ "$test_tag" = "@" ]; then
    echo -e "\033[0;33m⚠️  Ejecución completada para descubrir tags. El test falló intencionadamente.\033[0m"
    echo -e "\033[0;34mRevisa el reporte para ver TODOS los tags disponibles del proyecto:\033[0m"
    echo -e "\033[0;34m- npx playwright show-report (ver reporte con todos los tags)\033[0m"
    echo -e "\033[0;34m- exit (salir del contenedor)\033[0m"
else
    echo -e "\033[1;33mTests completados. Mantén la sesión abierta para revisar resultados.\033[0m"
    echo -e "\033[0;34mComandos útiles:\033[0m"
    echo -e "\033[0;34m- npx playwright show-report (ver reporte HTML)\033[0m"
    echo -e "\033[0;34m- npx playwright test --grep \"@otro_tag\" (ejecutar otros tests)\033[0m"
    echo -e "\033[0;34m- exit (salir del contenedor)\033[0m"
fi
echo ""
/bin/bash
EOF
    
    chmod +x "$script_path"
}

# Función para ejecutar contenedor con tests
run_container_with_tests() {
    local test_tag="$1"
    local test_name="$2"
    local logs_env="$3"
    local workers_option="$4"
    local headed_option="$5"
    local image_name="${6:-$DOCKER_IMAGE_NAME}"
    
    # Mostrar información del comando que se va a ejecutar
    if [ "$test_tag" = "@" ]; then
        show_status "Ejecutando descubrimiento de tags con '@' (fallará intencionadamente)..."
        show_warning "IMPORTANTE: El test fallará pero mostrará todos los tags en el reporte"
    else
        show_status "Ejecutando tests $test_name con tag $test_tag..."
    fi
    
    # Mostrar modo de ejecución
    if [ -n "$headed_option" ]; then
        show_info "Modo: HEADED (con interfaz gráfica)"
        show_warning "NOTA: Asegúrate de tener un entorno gráfico disponible"
    else
        show_info "Modo: HEADLESS (sin interfaz)"
    fi
    
    show_info "Entrando en el contenedor y ejecutando tests..."
    echo ""
    
    # Mostrar comandos que se ejecutarán
    show_success "Comandos que se ejecutarán:"
    show_command "sudo docker run -it --env-file .env --ipc=host --network=host --init -v ./:/END2ENDTESTS/ $image_name /bin/bash"
    
    # Construir comando de playwright usando la función helper para mostrar
    local playwright_cmd=$(build_playwright_command "$test_tag" "$logs_env" "$workers_option" "$headed_option" "")
    show_command "$playwright_cmd"
    echo ""
    
    # Crear script temporal para el contenedor
    create_container_script "$RUN_TESTS_SCRIPT" "$test_tag" "$logs_env" "$workers_option" "$headed_option"
    
    # Ejecutar el contenedor con el script
    show_status "Iniciando contenedor con tests $test_name..."
    sudo docker run -it --env-file .env --ipc=host --network=host --init \
        -v ./:/END2ENDTESTS/ \
        -v "$RUN_TESTS_SCRIPT:/run_tests.sh" \
        "$image_name" /run_tests.sh
    
    # Limpiar script temporal
    rm -f "$RUN_TESTS_SCRIPT"
}

# Función para ejecutar tests en el HOST (modo headed)
run_tests_on_host() {
    local test_tag="$1"
    local test_name="$2"
    local logs_env="$3"
    local headed_option="$4"
    
    # Mostrar información del comando que se va a ejecutar
    if [ "$test_tag" = "@" ]; then
        show_status "Ejecutando descubrimiento de tags con '@' (fallará intencionadamente)..."
        show_warning "IMPORTANTE: El test fallará pero mostrará todos los tags en el reporte"
    else
        show_status "Ejecutando tests $test_name en modo headed..."
    fi
    
    show_info "Modo: HEADED (con interfaz gráfica en el HOST)"
    show_info "Ejecutando directamente en el sistema host..."
    echo ""
    
    # Construir comando de playwright usando la función helper
    local playwright_cmd=$(build_playwright_command "$test_tag" "$logs_env" "" "$headed_option" "")
    
    show_success "Comando que se ejecutará:"
    show_command "$playwright_cmd"
    echo ""
    
    # Ejecutar directamente en el host
    show_status "Iniciando ejecución en el HOST..."
    eval $playwright_cmd
    
    # Mostrar comandos útiles post-ejecución
    echo ""
    show_success "Tests completados en modo headed."
    echo ""
    show_info "Comandos útiles:"
    echo -e "${BLUE}- npx playwright show-report (ver reporte HTML)${NC}"
    if [ "$test_tag" = "@" ]; then
        echo -e "${BLUE}- npx playwright test --grep \"@\" --headed (repetir descubrimiento)${NC}"
    else
        echo -e "${BLUE}- npx playwright test --grep \"$test_tag\" --headed (repetir mismo test)${NC}"
    fi
    echo ""
}

# Función para crear script de repetición de tests
create_repeat_script() {
    local script_path="$1" 
    local test_tag="$2"
    local logs_env="$3"
    local workers_option="$4"
    local headed_option="$5"
    
    # Construir comando usando la función helper
    local COMMAND=$(build_playwright_command "$test_tag" "$logs_env" "$workers_option" "$headed_option" "")
    
    cat > "$script_path" << EOF
#!/bin/bash
echo -e "\033[0;32m✓ Conectado de nuevo al contenedor Docker\033[0m"

if [ "$test_tag" = "@" ]; then
    echo -e "\033[0;33m⚠️  Repitiendo ejecución de '@' para descubrir tags...\033[0m"
fi

echo -e "\033[1;33mRepitiendo comando: $COMMAND\033[0m"
eval $COMMAND

echo ""
if [ "$test_tag" = "@" ]; then
    echo -e "\033[0;33m⚠️  Ejecución completada. Revisa el reporte para ver todos los tags disponibles.\033[0m"
    echo -e "\033[0;34mComando para ver el reporte: npx playwright show-report\033[0m"
else
    echo -e "\033[1;33mTests completados. Sesión activa para comandos adicionales.\033[0m"
fi

echo -e "\033[0;34mComandos útiles:\033[0m"
echo -e "\033[0;34m- npx playwright show-report (ver reporte HTML)\033[0m"
echo -e "\033[0;34m- npx playwright test --grep \"@otro_tag\" (ejecutar otros tests)\033[0m"
echo -e "\033[0;34m- exit (salir del contenedor)\033[0m"
echo ""
/bin/bash
EOF
    
    chmod +x "$script_path"
}

# Función para manejar el bucle de repetición de tests con opciones mejoradas
handle_test_repetition() {
    local test_tag="$1"
    local test_name="$2"
    local logs_env="$3"
    local workers_option="$4"
    local test_option="$5"
    local headed_option="$6"
    local image_name="${7:-$DOCKER_IMAGE_NAME}"
    
    # Solo ofrecer repetición si se ejecutaron tests
    if [ -n "$test_tag" ] && [ "$test_option" != "4" ]; then
        while true; do
            echo ""
            show_section_title "¿Qué deseas hacer a continuación?"
            
            # Mostrar el comando actual para referencia
            if [ "$test_tag" = "@" ]; then
                show_info "Último comando ejecutado: npx playwright test --grep \"@\" (descubrir tags)"
            else
                # Construir comando actual usando helper para mostrar
                local current_cmd=$(build_playwright_command "$test_tag" "$logs_env" "$workers_option" "" "")
                show_info "Último comando: $current_cmd"
            fi
            
            echo ""
            echo "1) Repetir el mismo comando ($test_tag)"
            echo "2) Ejecutar con nuevo tag"
            echo "3) Reajustar permisos de archivos de test"
            if [ "$MENU_CONTEXT" = "validation" ]; then
                echo "4) Volver al menú de validación"
                echo "5) Salir"
            else
                echo "4) Salir"
            fi
            echo ""
            if [ "$MENU_CONTEXT" = "validation" ]; then
                read -p "Selecciona una opción (1-5) [5]: " REPEAT_OPTION
                if [ -z "$REPEAT_OPTION" ]; then
                    REPEAT_OPTION=5
                fi
            else
                read -p "Selecciona una opción (1-4) [4]: " REPEAT_OPTION
                if [ -z "$REPEAT_OPTION" ]; then
                    REPEAT_OPTION=4
                fi
            fi
            
            case $REPEAT_OPTION in
                1)
                    # Repetir mismo comando
                    if [ "$test_tag" = "@" ]; then
                        show_warning "NOTA: Este comando fallará intencionadamente para mostrar todos los tags"
                    fi
                    
                    # Limpiar pantalla para mejor legibilidad
                    clear_with_title "Repitiendo ejecución de tests"
                    show_status "Conectando de nuevo al contenedor y ejecutando tests..."
                    
                    # Verificar que la imagen sigue existiendo
                    if check_docker_image_exists "$image_name"; then
                        # Crear script temporal para repetir comando
                        create_repeat_script "$REPEAT_TESTS_SCRIPT" "$test_tag" "$logs_env" "$workers_option" "$headed_option"
                        
                        # Ejecutar el contenedor con el script de repetición
                        show_status "Iniciando contenedor para repetir tests $test_name..."
                        sudo docker run -it --env-file .env --ipc=host --network=host --init \
                            -v ./:/END2ENDTESTS/ \
                            -v "$REPEAT_TESTS_SCRIPT:/repeat_tests.sh" \
                            "$image_name" /repeat_tests.sh
                        
                        # Limpiar script temporal
                        rm -f "$REPEAT_TESTS_SCRIPT"
                        
                        show_success "Tests completados. Regresando al menú de opciones..."
                    else
                        show_error "La imagen Docker '$image_name' ya no existe. No se puede repetir el comando."
                        break
                    fi
                    ;;
                2)
                    # Ejecutar con nuevo tag
                    echo ""
                    show_section_title "Selecciona el nuevo tag para ejecutar:"
                    echo "1) Tests master (@GIT_MASTER)"
                    echo "2) Tag personalizado"
                    echo "3) Ver tags disponibles"
                    echo "4) Cancelar (volver al menú anterior)"
                    echo ""
                    read -p "Selecciona una opción (1-4): " NEW_TAG_OPTION
                    
                    local new_test_tag=""
                    local new_test_name=""
                    
                    case $NEW_TAG_OPTION in
                        1)
                            new_test_tag="@GIT_MASTER"
                            new_test_name="master"
                            ;;
                        2)
                            show_section_title "Introduce el nuevo tag personalizado:"
                            echo -e "${RED}💡 TRUCO: Si introduces '@' se mostrarán TODOS los tags del proyecto${NC}"
                            read -p "Nuevo tag: " CUSTOM_NEW_TAG
                            
                            if [ -n "$CUSTOM_NEW_TAG" ]; then
                                if [ "$CUSTOM_NEW_TAG" = "@" ]; then
                                    show_warning "Ejecutarás '@' para descubrir todos los tags (fallará intencionadamente)"
                                    new_test_tag="@"
                                    new_test_name="descubrir todos los tags (@)"
                                else
                                    new_test_tag="$CUSTOM_NEW_TAG"
                                    new_test_name="personalizado ($CUSTOM_NEW_TAG)"
                                fi
                            else
                                show_error "No se introdujo ningún tag. Cancelando..."
                                continue
                            fi
                            ;;
                        3)
                            # Mostrar tags disponibles (reutilizar función existente)
                            show_available_tags
                            continue  # Volver al menú de nuevo tag
                            ;;
                        4)
                            show_info "Cancelando selección de nuevo tag..."
                            continue  # Volver al menú principal
                            ;;
                        *)
                            show_error "Opción inválida. Cancelando..."
                            continue
                            ;;
                    esac
                    
                    # Si se seleccionó un tag válido, ejecutarlo
                    if [ -n "$new_test_tag" ]; then
                        # Preguntar por configuración de workers
                        echo ""
                        show_section_title "¿Cuántos workers deseas usar?"
                        echo -e "${BLUE}(1=secuencial, 2-8=paralelo, Enter=por defecto de Playwright)${NC}"
                        read -p "Número de workers [actual: ${workers_option#--workers }]: " NEW_WORKERS_COUNT
                        
                        local new_workers_option=""
                        if validate_numeric_input "$NEW_WORKERS_COUNT" "$MIN_WORKERS" "$MAX_WORKERS"; then
                            new_workers_option="--workers $NEW_WORKERS_COUNT"
                            show_success "Usando $NEW_WORKERS_COUNT workers"
                        elif [ -z "$NEW_WORKERS_COUNT" ]; then
                            new_workers_option="$workers_option"  # Mantener configuración anterior
                            show_success "Manteniendo configuración anterior de workers"
                        else
                            show_warning "Número inválido. Manteniendo configuración anterior."
                            new_workers_option="$workers_option"
                        fi
                        
                        # Preguntar por logs
                        echo ""
                        show_section_title "¿Deseas mostrar logs detallados?"
                        read -p "Mostrar logs (s/N) [actual: $([ -n "$logs_env" ] && echo "sí" || echo "no")]: " NEW_SHOW_LOGS
                        
                        local new_logs_env=""
                        if [[ "$NEW_SHOW_LOGS" =~ ^[Ss]$ ]]; then
                            new_logs_env="SHOW_SUCCESS_LOGS=true"
                        elif [ -z "$NEW_SHOW_LOGS" ]; then
                            new_logs_env="$logs_env"  # Mantener configuración anterior
                        fi
                        
                        # Mostrar resumen del nuevo comando
                        echo ""
                        show_info_separator "   Nuevo comando a ejecutar   "
                        echo -e "Tag: ${GREEN}$new_test_tag${NC}"
                        echo -e "Workers: ${GREEN}${new_workers_option#--workers }${NC}"
                        echo -e "Logs detallados: ${GREEN}$([ -n "$new_logs_env" ] && echo "Sí" || echo "No")${NC}"
                        show_info_separator ""
                        
                        read -p "¿Confirmar ejecución? (S/n): " CONFIRM_NEW_TAG
                        if [[ "$CONFIRM_NEW_TAG" =~ ^[Nn]$ ]]; then
                            show_info "Cancelando ejecución con nuevo tag..."
                            continue
                        fi
                        
                        # Ejecutar con el nuevo tag
                        clear_with_title "Ejecutando tests con nuevo tag"
                        
                        if [ "$new_test_tag" = "@" ]; then
                            show_warning "IMPORTANTE: El test fallará pero mostrará todos los tags en el reporte"
                        fi
                        
                        # Verificar que la imagen sigue existiendo
                        if check_docker_image_exists "$image_name"; then
                            # Crear script temporal para el nuevo comando
                            create_repeat_script "$REPEAT_TESTS_SCRIPT" "$new_test_tag" "$new_logs_env" "$new_workers_option" "$headed_option"
                            
                            # Ejecutar el contenedor con el nuevo tag
                            show_status "Iniciando contenedor con nuevo tag: $new_test_tag..."
                            sudo docker run -it --env-file .env --ipc=host --network=host --init \
                                -v ./:/END2ENDTESTS/ \
                                -v "$REPEAT_TESTS_SCRIPT:/repeat_tests.sh" \
                                "$image_name" /repeat_tests.sh
                            
                            # Limpiar script temporal
                            rm -f "$REPEAT_TESTS_SCRIPT"
                            
                            # Actualizar variables para futuras iteraciones
                            test_tag="$new_test_tag"
                            test_name="$new_test_name"
                            logs_env="$new_logs_env"
                            workers_option="$new_workers_option"
                            
                            show_success "Tests completados. Regresando al menú de opciones..."
                        else
                            show_error "La imagen Docker '$image_name' ya no existe. No se puede ejecutar el comando."
                            break
                        fi
                    fi
                    ;;
                3)
                    # Reajustar permisos
                    echo ""
                    show_info "Reajustando permisos de archivos de test..."
                    fix_test_permissions
                    
                    show_info "Presiona Enter para continuar..."
                    read -r
                    ;;
                4)
                    if [ "$MENU_CONTEXT" = "validation" ]; then
                        # Volver al menú de validación
                        show_info "Volviendo al menú de validación de versiones"
                        export RETURN_TO_VALIDATION=true
                        break
                    else
                        # Salir (comportamiento original)
                        show_info "Saliendo del menú de repetición de tests"
                        break
                    fi
                    ;;
                5)
                    # Salir
                    show_info "Saliendo del menú de repetición de tests"
                    break
                    ;;
                *)
                    show_error "Opción inválida. Por favor selecciona $([ "$MENU_CONTEXT" = "validation" ] && echo "1, 2, 3, 4 o 5" || echo "1, 2, 3 o 4")."
                    ;;
            esac
        done
    fi
}

# Función para mostrar información de la imagen Docker
show_docker_image_info() {
    local image_name="${1:-$DOCKER_IMAGE_NAME}"
    
    if check_docker_image_exists "$image_name"; then
        local image_id=$(docker images "$image_name" --format "{{.ID}}")
        local created=$(docker images "$image_name" --format "{{.CreatedAt}}")
        local size=$(docker images "$image_name" --format "{{.Size}}")
        
        echo "Imagen ID: $image_id"
        echo "Creada: $created"
        echo "Tamaño: $size"
    else
        echo "Imagen '$image_name' no encontrada"
    fi
}

# Función para reajustar permisos de archivos de test
fix_test_permissions() {
    show_section_title "Reajustando permisos de archivos de test..."
    
    local dirs_to_fix=("test-results" "playwright-report" "playwright")
    local fixed_count=0
    
    for dir in "${dirs_to_fix[@]}"; do
        if [ -d "$dir" ]; then
            show_status "Aplicando permisos 777 a: $dir"
            if sudo chmod -R 777 "$dir" 2>/dev/null; then
                show_success "✓ Permisos actualizados: $dir"
                ((fixed_count++))
            else
                show_warning "✗ No se pudieron actualizar permisos: $dir"
            fi
        else
            show_info "- Directorio no encontrado: $dir"
        fi
    done
    
    echo ""
    if [ $fixed_count -gt 0 ]; then
        show_success "Permisos reajustados en $fixed_count directorios"
    else
        show_warning "No se encontraron directorios para reajustar"
    fi
    
    echo ""
    show_info "Comandos aplicados:"
    for dir in "${dirs_to_fix[@]}"; do
        if [ -d "$dir" ]; then
            show_command "sudo chmod -R 777 $dir"
        fi
    done
    echo ""
}

# Función para limpiar recursos Docker (opcional)
cleanup_docker_resources() {
    show_section_title "¿Deseas limpiar recursos Docker no utilizados?"
    echo "Esto eliminará:"
    echo "- Contenedores parados"  
    echo "- Redes no utilizadas"
    echo "- Volúmenes no utilizados"
    echo "- Imágenes huérfanas"
    echo ""
    
    read -p "Limpiar recursos Docker (s/N): " CLEANUP_DOCKER
    
    if [[ "$CLEANUP_DOCKER" =~ ^[Ss]$ ]]; then
        show_status "Limpiando recursos Docker..."
        
        # Limpiar contenedores parados
        docker container prune -f
        
        # Limpiar redes no utilizadas
        docker network prune -f
        
        # Limpiar volúmenes no utilizados
        docker volume prune -f
        
        # Limpiar imágenes huérfanas
        docker image prune -f
        
        show_success "Recursos Docker limpiados"
    else
        show_info "Omitiendo limpieza de recursos Docker"
    fi
    
    echo ""
}
