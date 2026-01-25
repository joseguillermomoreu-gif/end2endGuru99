#!/bin/bash

# =============================================================================
# EJECUCIÓN DE TESTS - End2End Tests Management
# =============================================================================
# Este módulo maneja la selección y ejecución de tests:
# - Menú de selección de tests
# - Configuración de workers y logs
# - Gestión de tags personalizados  
# - Selección de navegador para modo headed
# - Opción --u para update screenshots
#
# Autor: Jose Guillermo Moreu (jgmoreu@gmail.com)
# Última actualización: $(date '+%d de %B de %Y')
# =============================================================================

# Variables globales para la ejecución de tests
export TEST_TAG=""
export TEST_NAME=""
export TEST_OPTION=""
export WORKERS_OPTION=""
export LOGS_ENV=""
export HEADED_OPTION=""
export BROWSER_OPTION=""
export UPDATE_SCREENSHOTS=""
export HEADED_MODE=false
export USED_CUSTOM_TAG=""
export CUSTOM_TAG_TYPE=""
export MENU_CONTEXT=""

# Función principal para mostrar el menú de tests
show_tests_menu() {
    show_section_title "¿Deseas ejecutar algún test?"
    echo "1) Tag personalizado"
    echo "2) Ver tests disponibles en el proyecto"
    echo "3) No ejecutar tests"
    echo ""
    read -p "Selecciona una opción (1-3) [3]: " TEST_OPTION
    
    # Establecer valor por defecto
    if [ -z "$TEST_OPTION" ]; then
        TEST_OPTION=3
    fi
    
    case $TEST_OPTION in
        1)
            handle_custom_tag_selection
            ;;
        2)
            show_available_tests
            # NO volver a mostrar el menú automáticamente - la función maneja su propio flujo
            ;;
        3)
            show_info "Saltando ejecución de tests"
            TEST_TAG=""
            ;;
        *)
            show_error "Opción inválida. Saltando ejecución de tests."
            TEST_TAG=""
            ;;
    esac
}

# Función para manejar selección de directorio o archivo
handle_directory_selection() {
    show_section_title "Ejecutar tests por directorio o archivo:"
    echo ""
    echo -e "${GREEN}💺 DIRECTORIOS DISPONIBLES:${NC}"
    echo -e "${BLUE}• tests/ppia/${NC}        - Todos los tests PPIA autogenerados"
    echo -e "${BLUE}• tests/login/${NC}       - Tests de login"
    echo -e "${BLUE}• tests/customer/${NC}    - Tests de customer"
    echo -e "${BLUE}• tests/home/${NC}        - Tests de home"
    echo ""
    echo -e "${GREEN}📄 ARCHIVOS ESPECÍFICOS:${NC}"
    echo -e "${BLUE}• tests/login/cms/login.cms.nologin.spec.ts${NC}"
    echo -e "${BLUE}• tests/customer/renderDetails.web.login.spec.ts${NC}"
    echo ""
    echo -e "${YELLOW}EJEMPLOS:${NC}"
    echo -e "  tests/ppia/                    # Todos los tests PPIA"
    echo -e "  tests/login/                   # Todos los tests de login"
    echo -e "  tests/ppia/testsPPIA-4-reset/  # Solo tests PPIA de reset"
    echo ""
    read -p "Directorio o archivo: " DIRECTORY_INPUT
    
    if [ -n "$DIRECTORY_INPUT" ]; then
        # Es un directorio o archivo - usar como argumento directo
        TEST_TAG="$DIRECTORY_INPUT"
        TEST_NAME="directorio/archivo ($DIRECTORY_INPUT)"
        export CUSTOM_TAG_TYPE="directory"
        export USED_CUSTOM_TAG="$DIRECTORY_INPUT"
        show_success "Configurado para ejecutar: $DIRECTORY_INPUT"
    else
        show_error "No se introdujo ningún directorio. Cancelando."
        return
    fi
}

# Función para manejar selección de tag o regex
handle_tag_selection() {
    show_section_title "Ejecutar tests por tag o patrón:"
    echo ""
    echo -e "${GREEN}🏷️ TAGS DISPONIBLES:${NC}"
    echo -e "${BLUE}• @smoke${NC}           - Tests de humo/smoke"
    echo -e "${BLUE}• @regression${NC}      - Tests de regresión"
    echo -e "${BLUE}• @login${NC}           - Tests relacionados con login"
    echo -e "${BLUE}• @customer${NC}        - Tests relacionados con customers"
    echo ""
    echo -e "${GREEN}🔍 PATRONES DE TEXTO:${NC}"
    echo -e "${BLUE}• 'login'${NC}           - Tests que contengan 'login'"
    echo -e "${BLUE}• 'customer'${NC}        - Tests que contengan 'customer'"
    echo -e "${BLUE}• 'titulo'${NC}          - Tests que contengan 'titulo'"
    echo -e "${BLUE}• 'reset'${NC}           - Tests que contengan 'reset'"
    echo ""
    echo -e "${GREEN}🔄 PATRONES REGEX:${NC}"
    echo -e "${BLUE}• .*login.*${NC}         - Regex para login"
    echo -e "${BLUE}• .*customer.*${NC}      - Regex para customer"
    echo -e "${BLUE}• login|customer${NC}    - Múltiples patrones"
    echo ""
    echo -e "${YELLOW}EJEMPLOS:${NC}"
    echo -e "  @smoke                         # Tag smoke"
    echo -e "  'crear nuevo customer'         # Texto literal"
    echo -e "  .*login.*                      # Regex"
    echo -e "  reset|required                 # Múltiples patrones"
    echo ""
    read -p "Tag, texto o patrón regex: " TAG_INPUT
    
    if [ -n "$TAG_INPUT" ]; then
        # Es un tag o patrón - usar con --grep
        TEST_TAG="$TAG_INPUT"
        TEST_NAME="tag/patrón ($TAG_INPUT)"
        export CUSTOM_TAG_TYPE="grep"
        export USED_CUSTOM_TAG="$TAG_INPUT"
        show_success "Configurado para ejecutar con patrón: $TAG_INPUT"
    else
        show_error "No se introdujo ningún tag. Cancelando."
        return
    fi
}

# Función para manejar la selección de tag personalizado (LEGADO - mantener por compatibilidad)
handle_custom_tag_selection() {
    show_section_title "Introduce el tag personalizado o patrón de test:"
    echo ""
    echo -e "${GREEN}💡 OPCIONES DISPONIBLES:${NC}"
    echo -e "${BLUE}• Tags de Playwright:${NC} @smoke, @regression, @login, @customer"
    echo -e "${BLUE}• Títulos de test:${NC} 'verificar titulo', 'login exitoso'"
    echo -e "${BLUE}• Directorios:${NC} tests/ppia/, tests/login/, tests/customer/"
    echo -e "${BLUE}• Archivos específicos:${NC} tests/login/login.spec.ts"
    echo -e "${BLUE}• Patrones regex:${NC} .*login.*, .*customer.*"
    echo ""
    echo -e "${GREEN}📋 EJEMPLOS PARA GURU99:${NC}"
    echo -e "${YELLOW}• Tests de login:${NC} @login, 'login', tests/login/"
    echo -e "${YELLOW}• Tests de customer:${NC} @customer, 'customer', tests/customer/"
    echo -e "${YELLOW}• Tests PPIA:${NC} tests/ppia/ (todos los tests PPIA)"
    echo -e "${YELLOW}• Tests de navegación:${NC} @navigation, 'navegacion'"
    echo ""
    echo -e "${RED}💡 DESCUBRIR TESTS: Introduce '@' para ver todos los tests disponibles${NC}"
    echo ""
    read -p "Tag, directorio, archivo o patrón: " CUSTOM_TAG
    
    if [ -n "$CUSTOM_TAG" ]; then
        if [ "$CUSTOM_TAG" = "@" ]; then
            handle_discover_all_tests
        else
            # Detectar si es un directorio o archivo (contiene '/' y posiblemente termina en '/')
            if [[ "$CUSTOM_TAG" == *"/"* ]]; then
                # Es un directorio o archivo - usar como argumento directo
                TEST_TAG="$CUSTOM_TAG"
                TEST_NAME="directorio/archivo ($CUSTOM_TAG)"
                export CUSTOM_TAG_TYPE="directory"
            else
                # Es un tag o patrón - usar con --grep
                TEST_TAG="$CUSTOM_TAG"
                TEST_NAME="personalizado ($CUSTOM_TAG)"
                export CUSTOM_TAG_TYPE="grep"
            fi
            export USED_CUSTOM_TAG="$CUSTOM_TAG"
        fi
    else
        show_error "No se introdujo ningún tag. Saltando ejecución de tests."
        TEST_TAG=""
    fi
}

# Función para manejar el descubrimiento de todos los tests
handle_discover_all_tests() {
    show_info_separator "  DESCUBRIR TODOS LOS TESTS DISPONIBLES "
    show_status "Has introducido '@' - esto ejecutará todos los tests disponibles."
    show_status "Esto te permitirá ver en el reporte qué tests están disponibles."
    echo ""
    show_info "Los tests se ejecutarán normalmente y mostrarán resultados reales."
    echo ""
    
    read -p "¿Continuar con la ejecución de todos los tests? (s/N): " CONFIRM_DISCOVER
    if [[ "$CONFIRM_DISCOVER" =~ ^[Ss]$ ]]; then
        TEST_TAG="@"
        TEST_NAME="todos los tests disponibles (@)"
        export USED_CUSTOM_TAG="@"
        show_success "Se ejecutarán todos los tests disponibles"
    else
        show_info "Cancelando ejecución de tests"
        TEST_TAG=""
        # Volver a mostrar el menú
        show_tests_menu
        return
    fi
}

# Función para mostrar tests disponibles en el proyecto
show_available_tests() {
    show_info_separator "        Tests Disponibles en el Proyecto     "
    echo ""
    
    echo -e "${GREEN}Tests actuales detectados:${NC}"
    
    # Mostrar estructura de tests actual
    if [ -d "tests" ]; then
        echo -e "${YELLOW}Directorio tests/:${NC}"
        find tests -name "*.spec.ts" -o -name "*.spec.js" 2>/dev/null | head -10 | while read file; do
            echo -e "  ${BLUE}• ${file}${NC}"
        done
    fi
    
    if [ -d "tests/ppia" ]; then
        echo ""
        echo -e "${YELLOW}Tests PPIA (autogenerados):${NC}"
        find tests/ppia -name "*.generated.spec.ts" 2>/dev/null | head -5 | while read file; do
            basename_file=$(basename "$file")
            echo -e "  ${BLUE}• ${basename_file}${NC}"
        done
        local ppia_count=$(find tests/ppia -name "*.generated.spec.ts" 2>/dev/null | wc -l)
        if [ "$ppia_count" -gt 5 ]; then
            echo -e "  ${GRAY}... y $ppia_count tests más${NC}"
        fi
    fi
    
    echo ""
    echo -e "${GREEN}Formas de ejecutar tests:${NC}"
    echo -e "  ${YELLOW}Por directorio:${NC} tests/ppia/, tests/login/"
    echo -e "  ${YELLOW}Por nombre:${NC} 'login', 'customer', 'titulo'"
    echo -e "  ${YELLOW}Todos los tests:${NC} '@' (ejecutar todos)"
    echo ""
    
    echo -e "${BLUE}Comandos directos de Playwright:${NC}"
    echo -e "  npx playwright test                    # Todos los tests"
    echo -e "  npx playwright test tests/ppia/        # Solo tests PPIA"
    echo -e "  npx playwright test --grep 'login'     # Tests que contengan 'login'"
    echo -e "  npx playwright test --headed            # Modo headed (con interfaz)"
    echo -e "  npx playwright test --update-snapshots # Actualizar screenshots"
    
    show_info_separator ""
    echo ""
    
    # Preguntar al usuario qué quiere hacer en lugar de volver automáticamente
    echo -e "${YELLOW}\u00bfQué deseas hacer ahora?${NC}"
    echo "1) Ejecutar tests por directorio"
    echo "2) Ejecutar tests por tag/regex"
    echo "3) Volver al menú principal"
    echo ""
    read -p "Selecciona una opción (1-3) [3]: " NEXT_ACTION
    
    case "${NEXT_ACTION:-3}" in
        1)
            handle_directory_selection
            ;;
        2)
            handle_tag_selection
            ;;
        3|*)
            return  # Volver al menú principal sin bucle
            ;;
    esac
}

# Función para configurar el modo headed
configure_headed() {
    if [ -n "$TEST_TAG" ]; then
        echo ""
        show_section_title "¿Deseas ejecutar en modo headed (con interfaz gráfica)?"
        echo -e "${BLUE}(En modo headed podrás ver la ejecución en tiempo real)${NC}"
        echo -e "${YELLOW}NOTA: El modo headed se ejecuta en el HOST (fuera del contenedor Docker)${NC}"
        read -p "Modo headed (s/N): " SHOW_HEADED
        
        # Configurar variable para headed
        if [[ "$SHOW_HEADED" =~ ^[Ss]$ ]]; then
            HEADED_OPTION="--headed"
            export HEADED_MODE=true
            configure_browser_selection
            show_success "Modo headed habilitado (se ejecutará en el HOST)"
        else
            HEADED_OPTION=""
            export HEADED_MODE=false
            show_success "Modo headless (dentro del contenedor Docker)"
        fi
    fi
}

# Función para configurar selección de navegador en modo headed
configure_browser_selection() {
    echo ""
    show_section_title "¿Qué navegador(es) deseas usar?"
    echo "1) Chromium (por defecto)"
    echo "2) Firefox"
    echo "3) Ambos (Chromium + Firefox)"
    echo ""
    read -p "Selecciona una opción (1-3) [1]: " BROWSER_CHOICE
    
    # Establecer valor por defecto
    if [ -z "$BROWSER_CHOICE" ]; then
        BROWSER_CHOICE=1
    fi
    
    case $BROWSER_CHOICE in
        1)
            BROWSER_OPTION="--project=chromium"
            show_success "Navegador: Chromium"
            ;;
        2)
            BROWSER_OPTION="--project=firefox"
            show_success "Navegador: Firefox"
            ;;
        3)
            BROWSER_OPTION="--project=chromium --project=firefox"
            show_success "Navegadores: Chromium + Firefox"
            ;;
        *)
            BROWSER_OPTION="--project=chromium"
            show_warning "Opción inválida. Usando Chromium por defecto."
            ;;
    esac
}

# Función para configurar workers para ejecución paralela
configure_workers() {
    # Solo preguntar por workers si NO estamos en modo headed
    if [ -n "$TEST_TAG" ] && [ "$HEADED_MODE" != true ]; then
        echo ""
        show_section_title "¿Cuántos workers deseas usar para la ejecución paralela?"
        echo -e "${BLUE}(1=secuencial, 2-8=paralelo, Enter=por defecto de Playwright)${NC}"
        read -p "Número de workers [defecto]: " WORKERS_COUNT
        
        # Validar entrada de workers
        if [[ "$WORKERS_COUNT" =~ ^[0-9]+$ ]] && [ "$WORKERS_COUNT" -ge 1 ] && [ "$WORKERS_COUNT" -le 8 ]; then
            WORKERS_OPTION="--workers $WORKERS_COUNT"
            show_success "Usando $WORKERS_COUNT workers"
        elif [ -z "$WORKERS_COUNT" ]; then
            WORKERS_OPTION=""
            show_success "Usando configuración por defecto de Playwright"
        else
            show_warning "Número inválido. Usando configuración por defecto."
            WORKERS_OPTION=""
        fi
    elif [ "$HEADED_MODE" = true ]; then
        show_info "Workers: Automático (Playwright maneja single-worker en headed)"
        WORKERS_OPTION=""
    fi
}

# Función para configurar logs detallados
configure_logs() {
    if [ -n "$TEST_TAG" ]; then
        echo ""
        show_section_title "¿Deseas mostrar logs detallados de los tests?"
        echo -e "${BLUE}(Mostrará logs de éxito y detalles adicionales)${NC}"
        read -p "Mostrar logs (s/N): " SHOW_LOGS
        
        # Configurar variable de entorno para logs
        if [[ "$SHOW_LOGS" =~ ^[Ss]$ ]]; then
            LOGS_ENV="SHOW_SUCCESS_LOGS=true"
            show_success "Logs detallados habilitados"
        else
            LOGS_ENV=""
            show_success "Logs estándar (sin logs de éxito)"
        fi
    fi
}

# Función para detectar y configurar actualización de screenshots
configure_update_screenshots() {
    # Verificar si se pasó la opción --u como argumento
    for arg in "$@"; do
        if [ "$arg" = "--u" ] || [ "$arg" = "--update-snapshots" ]; then
            UPDATE_SCREENSHOTS="--update-snapshots"
            show_info "Opción --u detectada: Se actualizarán los screenshots"
            return
        fi
    done
    
    # Si no se pasó como argumento, preguntar al usuario
    if [ -n "$TEST_TAG" ]; then
        echo ""
        show_section_title "¿Deseas actualizar los screenshots/snapshots?"
        echo -e "${BLUE}(Útil si han cambiado elementos visuales de la aplicación)${NC}"
        echo -e "${YELLOW}EQUIVALE A: --update-snapshots${NC}"
        read -p "Actualizar screenshots (s/N): " UPDATE_SNAPS
        
        if [[ "$UPDATE_SNAPS" =~ ^[Ss]$ ]]; then
            UPDATE_SCREENSHOTS="--update-snapshots"
            show_success "Screenshots se actualizarán durante la ejecución"
        else
            UPDATE_SCREENSHOTS=""
            show_success "Screenshots no se actualizarán"
        fi
    fi
}

# Función para mostrar resumen de configuración antes de ejecutar
show_test_configuration_summary() {
    if [ -n "$TEST_TAG" ]; then
        echo ""
        show_info_separator "   Configuración de ejecución de tests   "
        echo -e "Tag a ejecutar: ${GREEN}$TEST_TAG${NC}"
        echo -e "Nombre del test: ${GREEN}$TEST_NAME${NC}"
        
        # Mostrar modo y ubicación de ejecución
        if [ -n "$HEADED_OPTION" ]; then
            echo -e "Modo: ${GREEN}Headed (interfaz gráfica)${NC}"
            echo -e "Ejecución: ${GREEN}En el HOST (fuera del contenedor)${NC}"
            echo -e "Workers: ${GREEN}Automático (single-worker)${NC}"
            
            # Mostrar navegador(es) seleccionado(s)
            if [ -n "$BROWSER_OPTION" ]; then
                if [[ "$BROWSER_OPTION" == *"chromium"* ]] && [[ "$BROWSER_OPTION" == *"firefox"* ]]; then
                    echo -e "Navegadores: ${GREEN}Chromium + Firefox${NC}"
                elif [[ "$BROWSER_OPTION" == *"firefox"* ]]; then
                    echo -e "Navegador: ${GREEN}Firefox${NC}"
                else
                    echo -e "Navegador: ${GREEN}Chromium${NC}"
                fi
            fi
        else
            echo -e "Modo: ${GREEN}Headless (sin interfaz)${NC}"
            echo -e "Ejecución: ${GREEN}En contenedor Docker${NC}"
            
            if [ -n "$WORKERS_OPTION" ]; then
                echo -e "Workers: ${GREEN}${WORKERS_OPTION#--workers }${NC}"
            else
                echo -e "Workers: ${GREEN}Por defecto de Playwright${NC}"
            fi
        fi
        
        # Mostrar logs
        if [ -n "$LOGS_ENV" ]; then
            echo -e "Logs detallados: ${GREEN}Habilitados${NC}"
        else
            echo -e "Logs detallados: ${GREEN}Deshabilitados${NC}"
        fi
        
        # Mostrar actualización de screenshots
        if [ -n "$UPDATE_SCREENSHOTS" ]; then
            echo -e "Screenshots: ${GREEN}Se actualizarán (--update-snapshots)${NC}"
        else
            echo -e "Screenshots: ${GREEN}No se actualizarán${NC}"
        fi
        
        show_info_separator ""
        echo ""
    fi
}

# Función para validar que se ha seleccionado un test válido
is_valid_test_selected() {
    [ -n "$TEST_TAG" ]
}

# Función para resetear variables de test
reset_test_variables() {
    export TEST_TAG=""
    export TEST_NAME=""
    export TEST_OPTION=""
    export WORKERS_OPTION=""
    export LOGS_ENV=""
    export HEADED_OPTION=""
    export BROWSER_OPTION=""
    export UPDATE_SCREENSHOTS=""
    export HEADED_MODE=false
    export USED_CUSTOM_TAG=""
    export CUSTOM_TAG_TYPE=""
    export MENU_CONTEXT=""
}

# Función para mostrar el tag personalizado usado en el resumen final
show_custom_tag_summary() {
    # Mostrar tag personalizado usado si aplica
    if [ -n "$USED_CUSTOM_TAG" ]; then
        echo ""
        show_info_separator "        Tag personalizado usado       "
        echo -e "${YELLOW}Tag ejecutado: ${GREEN}$USED_CUSTOM_TAG${NC}"
        
        if [ "$USED_CUSTOM_TAG" = "@" ]; then
            show_info "Se ejecutaron todos los tests disponibles"
            show_info "Revisa el reporte de Playwright para ver los resultados completos"
            show_command "Comando para ver el reporte: npx playwright show-report"
        else
            show_info "Para volver a usar este tag:"
            show_command "npx playwright test --grep \"$USED_CUSTOM_TAG\""
        fi
    fi
}
