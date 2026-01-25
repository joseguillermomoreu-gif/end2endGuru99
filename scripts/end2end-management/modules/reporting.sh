#!/bin/bash

# =============================================================================
# REPORTES Y ESTADO FINAL - End2End Tests Management  
# =============================================================================
# Este módulo maneja la presentación de información final:
# - Estado final del repositorio y entorno
# - Resumen de tests ejecutados
# - Comandos útiles para ejecución manual
# - Limpieza final
#
# Autor: Jose Guillermo Moreu (joseguillermomoreu@gmail.com)
# Última actualización: $(date '+%d de %B de %Y')
# =============================================================================

# Función para mostrar el estado completo al final del proceso
show_final_status() {
    show_completion_banner
    
    # Estado del repositorio
    show_final_repository_status
    
    # Estado del entorno
    show_final_environment_status
    
    # Tag personalizado usado
    show_custom_tag_summary
    
    # Comandos útiles
    show_useful_commands
    
    # Limpieza final
    perform_final_cleanup
}

# Función para mostrar comandos útiles para ejecución manual
show_useful_commands() {
    echo ""
    show_info "Comandos útiles para ejecución manual:"
    
    echo -e "${BLUE}• Ejecutar todos los tests:${NC}"
    echo -e "  npx playwright test"
    echo -e "  docker run --env-file .env --ipc=host --network=host --init $DOCKER_IMAGE_NAME"
    
    echo -e "${BLUE}• Entrar en el contenedor para desarrollo:${NC}"
    echo -e "  sudo docker run -it --env-file .env --ipc=host --network=host --init -v ./:/END2ENDTESTS/ $DOCKER_IMAGE_NAME /bin/bash"
    
    echo -e "${BLUE}• Ejecutar tests específicos:${NC}"
    echo -e "  npx playwright test tests/ppia/                # Tests PPIA"
    echo -e "  npx playwright test --grep 'login'             # Tests de login"
    echo -e "  npx playwright test --grep '@smoke'            # Tests con tag smoke"
    echo -e "  npx playwright test --grep 'titulo|customer'   # Múltiples patrones"
    
    echo -e "${BLUE}• Ejecutar con configuraciones especiales:${NC}"
    echo -e "  npx playwright test --workers 4                # Con 4 workers paralelos"
    echo -e "  npx playwright test --headed                    # Modo headed (con interfaz)"
    echo -e "  npx playwright test --update-snapshots         # Actualizar screenshots"
    echo -e "  npx playwright test --project=firefox          # Solo Firefox"
    
    echo -e "${BLUE}• Ejecutar con logs detallados:${NC}"
    echo -e "  SHOW_SUCCESS_LOGS=true npx playwright test"
    
    echo -e "${BLUE}• Ver reportes:${NC}"
    echo -e "  npx playwright show-report"
    echo -e "  npx playwright test --reporter=html"
    
    echo -e "${BLUE}• Script interactivo:${NC}"
    echo -e "  ./end2end.sh                                    # Menú interactivo"
    echo -e "  ./end2end.sh --u                                # Con update screenshots"
    echo -e "  ./end2end.sh --headed                           # Modo headed con selección navegador"
}

# Función para mostrar estadísticas del proyecto (opcional)
show_project_statistics() {
    if [ -d "tests" ]; then
        local test_files=$(find tests -name "*.spec.ts" -o -name "*.spec.js" | wc -l)
        local total_files=$(find tests -type f | wc -l)
        
        echo ""
        show_section_title "Estadísticas del proyecto:"
        echo -e "Archivos de test: ${GREEN}$test_files${NC}"
        echo -e "Total de archivos en /tests: ${GREEN}$total_files${NC}"
        
        # Mostrar tamaño del directorio node_modules si existe
        if [ -d "node_modules" ]; then
            local node_modules_size=$(du -sh node_modules 2>/dev/null | cut -f1)
            echo -e "Tamaño node_modules: ${GREEN}$node_modules_size${NC}"
        fi
        
        # Mostrar información del package.json si existe
        if [ -f "package.json" ]; then
            local playwright_version=$(grep -o '"@playwright/test": "[^"]*"' package.json | cut -d'"' -f4)
            if [ -n "$playwright_version" ]; then
                echo -e "Versión Playwright: ${GREEN}$playwright_version${NC}"
            fi
        fi
    fi
}

# Función para mostrar información de recursos del sistema
show_system_resources() {
    echo ""
    show_section_title "Recursos del sistema:"
    
    # Información de memoria disponible
    local memory_info=$(free -h | grep "^Mem:" | awk '{print $7}')
    if [ -n "$memory_info" ]; then
        echo -e "Memoria disponible: ${GREEN}$memory_info${NC}"
    fi
    
    # Información de espacio en disco
    local disk_info=$(df -h . | tail -1 | awk '{print $4}')
    if [ -n "$disk_info" ]; then
        echo -e "Espacio disponible: ${GREEN}$disk_info${NC}"
    fi
    
    # Información de Docker (si está disponible)
    if command -v docker >/dev/null 2>&1; then
        local docker_images=$(docker images | grep -c "^$DOCKER_IMAGE_NAME ")
        echo -e "Imágenes Docker '$DOCKER_IMAGE_NAME': ${GREEN}$docker_images${NC}"
        
        # Mostrar contenedores activos relacionados
        local active_containers=$(docker ps --format "table {{.Names}}" | grep -c "$DOCKER_IMAGE_NAME" || echo "0")
        if [ "$active_containers" -gt 0 ]; then
            echo -e "Contenedores activos: ${YELLOW}$active_containers${NC}"
        fi
    fi
}

# Función para generar resumen ejecutivo
generate_executive_summary() {
    echo ""
    show_main_separator "           RESUMEN EJECUTIVO            "
    
    local current_time=$(date '+%H:%M:%S - %d/%m/%Y')
    echo -e "Ejecución completada: ${GREEN}$current_time${NC}"
    
    # Información del repositorio
    if [ -n "$FINAL_BRANCH" ]; then
        echo -e "Rama final: ${GREEN}$FINAL_BRANCH${NC}"
    fi
    
    # Información del entorno
    if [ -n "$FINAL_ENV" ]; then
        case $FINAL_ENV in
            "dev")
                echo -e "Entorno: ${GREEN}Desarrollo${NC}"
                ;;
            "pre")
                echo -e "Entorno: ${BLUE}Preproducción${NC}"
                ;;
            *)
                echo -e "Entorno: ${YELLOW}$FINAL_ENV${NC}"
                ;;
        esac
    fi
    
    # Información del contenedor Docker
    if [ "$CONTAINER_BUILT" = true ]; then
        echo -e "Contenedor Docker: ${GREEN}Reconstruido${NC}"
    elif check_docker_image_exists; then
        echo -e "Contenedor Docker: ${GREEN}Disponible${NC}"
    else
        echo -e "Contenedor Docker: ${YELLOW}No disponible${NC}"
    fi
    
    # Test ejecutado
    if [ -n "$USED_CUSTOM_TAG" ]; then
        echo -e "Test ejecutado: ${GREEN}$USED_CUSTOM_TAG${NC}"
    elif [ -n "$TEST_TAG" ] && [ "$TEST_OPTION" != "5" ]; then
        echo -e "Test ejecutado: ${GREEN}$TEST_TAG${NC}"
    else
        echo -e "Tests: ${YELLOW}No ejecutados${NC}"
    fi
    
    # Estado del working tree
    if [ -z "$FINAL_GIT_STATUS" ]; then
        echo -e "Estado Git: ${GREEN}Limpio${NC}"
    else
        echo -e "Estado Git: ${YELLOW}Cambios pendientes${NC}"
    fi
    
    show_main_separator ""
}

# Función para realizar limpieza final
perform_final_cleanup() {
    # Limpiar archivos temporales
    cleanup_temp_files
    
    # Resetear variables de test si se desea
    if [ "$1" = "reset" ]; then
        reset_test_variables
    fi
    
    # Opcional: limpiar recursos Docker no utilizados
    # cleanup_docker_resources  # Descomentado si se quiere limpieza automática
}

# Función para mostrar mensaje de despedida
show_farewell_message() {
    echo ""
    echo -e "${GREEN}¡Gracias por usar el sistema de gestión End2EndTests!${NC}"
    echo -e "${BLUE}Para más información, consulta la documentación en:${NC}"
    echo -e "${BLUE}  - README.md del proyecto${NC}"
    echo -e "${BLUE}  - /var/www/scripts/README.md${NC}"
    echo ""
}

# Función para mostrar próximos pasos sugeridos
show_next_steps() {
    echo ""
    show_section_title "Próximos pasos sugeridos:"
    
    if [ -n "$FINAL_GIT_STATUS" ]; then
        echo -e "${YELLOW}1. Revisar y commitear cambios pendientes${NC}"
        echo -e "   ${BLUE}git add . && git commit -m \"Tu mensaje\"${NC}"
    fi
    
    if [ "$TEST_OPTION" = "5" ] || [ -z "$TEST_TAG" ]; then
        echo -e "${YELLOW}2. Ejecutar tests para verificar el estado actual${NC}"
        echo -e "   ${BLUE}./end2end.sh${NC}"
    fi
    
    if [ "$ENVIRONMENT_CHANGED" = true ]; then
        echo -e "${YELLOW}3. Verificar que el entorno funciona correctamente${NC}"
        echo -e "   ${BLUE}Ejecutar algunos tests básicos${NC}"
    fi
    
    if [ "$CONTAINER_BUILT" = true ]; then
        echo -e "${YELLOW}4. Opcional: Limpiar imágenes Docker antiguas${NC}"
        echo -e "   ${BLUE}docker image prune${NC}"
    fi
    
    echo -e "${GREEN}5. ¡Continuar desarrollando y testeando!${NC}"
}

# Función para mostrar información de ayuda rápida
show_quick_help() {
    echo ""
    show_section_title "Ayuda rápida:"
    
    echo -e "${BLUE}Reejecutar este script:${NC}"
    echo -e "  ./end2end.sh"
    
    echo -e "${BLUE}Comandos Playwright útiles:${NC}"
    echo -e "  npx playwright test      - Ejecutar todos los tests"
    echo -e "  npx playwright --help    - Ayuda de Playwright"
    echo -e "  npx playwright show-report - Ver último reporte"
    
    echo -e "${BLUE}Documentación:${NC}"
    echo -e "  cat README.md            - Documentación del proyecto"
    echo -e "  cat instrucciones.md     - Instrucciones específicas"
}

# Función para exportar resumen a archivo (opcional)
export_summary_to_file() {
    local summary_file="$1"
    local timestamp=$(date '+%Y%m%d_%H%M%S')
    
    if [ -z "$summary_file" ]; then
        summary_file="end2end_summary_$timestamp.txt"
    fi
    
    echo "=== RESUMEN DE EJECUCIÓN END2ENDTESTS ===" > "$summary_file"
    echo "Fecha y hora: $(date)" >> "$summary_file"
    echo "Rama: $FINAL_BRANCH" >> "$summary_file"
    echo "Último commit: $FINAL_COMMIT" >> "$summary_file"
    echo "Entorno: $FINAL_ENV" >> "$summary_file"
    echo "Test ejecutado: ${USED_CUSTOM_TAG:-$TEST_TAG}" >> "$summary_file"
    echo "Contenedor construido: $CONTAINER_BUILT" >> "$summary_file"
    echo "Entorno cambiado: $ENVIRONMENT_CHANGED" >> "$summary_file"
    
    if [ -n "$FINAL_GIT_STATUS" ]; then
        echo "" >> "$summary_file"
        echo "=== CAMBIOS PENDIENTES ===" >> "$summary_file"
        git status --porcelain >> "$summary_file"
    fi
    
    show_success "Resumen exportado a: $summary_file"
}

# Función para crear reporte en formato JSON (para integración)
create_json_report() {
    local json_file="${1:-end2end_report.json}"
    local timestamp=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
    
    cat > "$json_file" << EOF
{
  "timestamp": "$timestamp",
  "repository": {
    "branch": "$FINAL_BRANCH",
    "commit": "$FINAL_COMMIT",
    "hasUncommittedChanges": $([ -n "$FINAL_GIT_STATUS" ] && echo "true" || echo "false")
  },
  "environment": {
    "current": "$FINAL_ENV",
    "changed": $ENVIRONMENT_CHANGED
  },
  "docker": {
    "imageBuilt": $CONTAINER_BUILT,
    "imageExists": $(check_docker_image_exists && echo "true" || echo "false")
  },
  "tests": {
    "executed": $([ -n "$TEST_TAG" ] && [ "$TEST_OPTION" != "5" ] && echo "true" || echo "false"),
    "tag": "${USED_CUSTOM_TAG:-$TEST_TAG}",
    "name": "$TEST_NAME",
    "workers": "${WORKERS_OPTION#--workers }",
    "detailedLogs": $([ -n "$LOGS_ENV" ] && echo "true" || echo "false")
  }
}
EOF
    
    show_success "Reporte JSON creado: $json_file"
}
