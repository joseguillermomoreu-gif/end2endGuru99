#!/bin/bash

# =============================================================================
# SCRIPT PRINCIPAL - End2End Tests Management
# =============================================================================
# Script interactivo para gestión y ejecución de tests automatizados.
# Orquesta el flujo completo:
# - Verificación del entorno
# - Gestión Git (branches, updates)
# - Construcción de contenedores Docker
# - Ejecución de tests
# - Reportes finales
#
# Autor: Jose Guillermo Moreu (jgmoreu@gmail.com)
# Última actualización: $(date '+%d de %B de %Y')
# =============================================================================

# Obtener el directorio del script para imports relativos
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Importar configuración global
source "$SCRIPT_DIR/config.sh"

# Importar todos los módulos
source "$SCRIPT_DIR/modules/colors.sh"
source "$SCRIPT_DIR/modules/git_operations.sh"
source "$SCRIPT_DIR/modules/environment.sh"
source "$SCRIPT_DIR/modules/docker_operations.sh"
source "$SCRIPT_DIR/modules/test_execution.sh"
source "$SCRIPT_DIR/modules/reporting.sh"

# =============================================================================
# FUNCIONES PRINCIPALES DEL FLUJO
# =============================================================================

# Función principal que orquesta todo el flujo
main() {
    # Verificar prerrequisitos
    setup_and_verify
    
    # Mostrar banner de inicio
    show_startup_banner
    
    # Mostrar estado inicial
    show_initial_status
    
    # Gestión de Git
    handle_git_operations
    
    # Gestión de entornos
    handle_environment_operations
    
    # Gestión de Docker
    handle_docker_operations
    
    # Gestión de tests
    handle_test_operations
    
    # Mostrar estado final y reportes
    show_final_status
    
    # Limpieza final
    cleanup_and_exit
}

# Función para configurar y verificar prerrequisitos
setup_and_verify() {
    # Verificar que estamos en el directorio correcto
    verify_project_directory
    
    # Verificar que es un repositorio git válido
    verify_git_repository
    
    # Auto-asignar permisos de ejecución si es necesario
    chmod +x "$0" 2>/dev/null || true
}

# Función para mostrar el estado inicial del proyecto
show_initial_status() {
    show_main_separator "    Gestión End2EndTests - Guru99     "
    
    # Estado del repositorio
    show_repository_status
    show_git_status
    
    # Estado del entorno
    show_current_environment
}

# Función para manejar todas las operaciones Git
handle_git_operations() {
    # Selección y cambio de rama
    handle_branch_selection
    
    # Actualización del repositorio
    handle_repository_update
}

# Función para manejar operaciones de entorno
handle_environment_operations() {
    # Cambio de entorno (dev/pre)
    handle_environment_change
}

# Función para manejar operaciones Docker
handle_docker_operations() {
    # Construcción del contenedor
    handle_docker_container_build
}

# Función para manejar la ejecución de tests
handle_test_operations() {
    while true; do
        # Limpiar el estado de retorno al menú de validación
        export RETURN_TO_VALIDATION=false
        
        # Menú de selección de tests
        show_tests_menu
        
        # Solo continuar si se seleccionó un test válido
        if is_valid_test_selected; then
            # Configurar modo headed, workers y logs
            configure_headed
            configure_workers
            configure_logs
            
            # Mostrar resumen de configuración
            show_test_configuration_summary
            
            if [ "$HEADED_MODE" = true ]; then
                # Ejecutar en el HOST (modo headed)
                run_tests_on_host "$TEST_TAG" "$TEST_NAME" "$LOGS_ENV" "$HEADED_OPTION"
                # NOTA: En modo headed no hay repetición automática (se ejecuta en el host)
                break  # Salir del bucle después de tests headed
            else
                # Verificar/construir imagen Docker para tests headless
                if ensure_docker_image_for_tests; then
                    # Ejecutar en contenedor Docker (modo headless)
                    run_container_with_tests "$TEST_TAG" "$TEST_NAME" "$LOGS_ENV" "$WORKERS_OPTION" ""
                    
                    # Manejar repetición de tests (solo en modo headless)
                    handle_test_repetition "$TEST_TAG" "$TEST_NAME" "$LOGS_ENV" "$WORKERS_OPTION" "$TEST_OPTION" ""
                    
                    # Verificar si se debe volver al menú de validación
                    if [ "$RETURN_TO_VALIDATION" = true ]; then
                        # Continuar el bucle para volver al menú de validación
                        continue
                    fi
                    
                    # Si no se volvió al menú de validación, salir del bucle
                    break
                fi
            fi
        else
            # No se seleccionó test, salir del bucle
            break
        fi
    done
}

# Función para limpieza y salida
cleanup_and_exit() {
    # Limpieza de archivos temporales
    cleanup_temp_files
    
    # Mensaje de despedida opcional
    # show_farewell_message
    
    # Salir limpiamente
    exit 0
}

# =============================================================================
# FUNCIONES DE UTILIDAD Y MANEJO DE ERRORES
# =============================================================================

# Función para manejar interrupciones (Ctrl+C)
handle_interrupt() {
    echo ""
    show_warning "Script interrumpido por el usuario"
    cleanup_temp_files
    echo ""
    show_info "Limpieza completada. Saliendo..."
    exit 130
}

# Función para manejar errores críticos
handle_error() {
    local error_message="$1"
    local line_number="$2"
    
    echo ""
    show_error "Error crítico en la línea $line_number: $error_message"
    show_error "El script se detendrá por seguridad"
    
    # Mostrar estado actual para debugging
    echo ""
    show_section_title "Estado del sistema al momento del error:"
    echo "Directorio actual: $(pwd)"
    echo "Usuario: $(whoami)"
    echo "Fecha: $(date)"
    
    if [ -d ".git" ]; then
        echo "Branch actual: $(git branch --show-current 2>/dev/null || echo 'desconocida')"
    fi
    
    # Limpieza de emergencia
    cleanup_temp_files
    
    echo ""
    show_info "Para obtener ayuda, revisa:"
    show_info "  - README.md del proyecto"
    show_info "  - Logs del sistema"
    show_info "  - Documentación en /var/www/scripts/README.md"
    
    exit 1
}

# Función para mostrar ayuda
show_help() {
    echo "Uso: $0 [OPCIONES]"
    echo ""
    echo "Sistema de gestión modular para End2EndTests"
    echo ""
    echo "OPCIONES:"
    echo "  -h, --help        Mostrar esta ayuda"
    echo "  -v, --version     Mostrar versión"
    echo "  --dry-run         Modo simulación (no ejecutar comandos destructivos)"
    echo "  --skip-docker     Saltar verificación y construcción de Docker"
    echo "  --skip-git        Saltar operaciones Git"
    echo "  --auto-yes        Responder 'sí' automáticamente a todas las preguntas"
    echo "  --quiet           Modo silencioso (solo errores)"
    echo "  --verbose         Modo verboso (debug)"
    echo ""
    echo "EJEMPLOS:"
    echo "  $0                Ejecución normal interactiva"
    echo "  $0 --dry-run      Ver qué se haría sin ejecutar"
    echo "  $0 --auto-yes     Ejecución automática con valores por defecto"
    echo ""
    echo "ARCHIVOS:"
    echo "  config.sh         Configuración global"
    echo "  modules/          Módulos funcionales"
    echo ""
    echo "Para más información, consulta la documentación del proyecto."
}

# Función para mostrar información de versión
show_version() {
    echo "End2EndTests Management System v1.0.0"
    echo "Sistema modular para gestión de tests Playwright"
    echo ""
    echo "Módulos disponibles:"
    echo "  - git_operations.sh    Gestión de Git"
    echo "  - environment.sh       Gestión de entornos"
    echo "  - docker_operations.sh Gestión de Docker"
    echo "  - test_execution.sh    Ejecución de tests"
    echo "  - reporting.sh         Reportes y estado final"
    echo "  - colors.sh            Utilidades de presentación"
    echo ""
    echo "Autor: Sistema de Scripts Modular"
    echo "Fecha: $(date '+%B %Y')"
}

# =============================================================================
# MANEJO DE ARGUMENTOS Y CONFIGURACIÓN
# =============================================================================

# Variables para argumentos de línea de comandos
DRY_RUN=false
SKIP_DOCKER=false
SKIP_GIT=false
AUTO_YES=false
QUIET_MODE=false
VERBOSE_MODE=false

# Función para procesar argumentos de línea de comandos
process_arguments() {
    while [[ $# -gt 0 ]]; do
        case $1 in
            -h|--help)
                show_help
                exit 0
                ;;
            -v|--version)
                show_version
                exit 0
                ;;
            --dry-run)
                DRY_RUN=true
                export DRY_RUN
                show_info "Modo simulación activado"
                shift
                ;;
            --skip-docker)
                SKIP_DOCKER=true
                export SKIP_DOCKER
                show_info "Saltando operaciones Docker"
                shift
                ;;
            --skip-git)
                SKIP_GIT=true
                export SKIP_GIT
                show_info "Saltando operaciones Git"
                shift
                ;;
            --auto-yes)
                AUTO_YES=true
                export AUTO_YES
                show_info "Modo automático activado"
                shift
                ;;
            --quiet)
                QUIET_MODE=true
                export QUIET_MODE
                shift
                ;;
            --verbose)
                VERBOSE_MODE=true
                export VERBOSE_MODE
                show_info "Modo verboso activado"
                shift
                ;;
            *)
                show_error "Argumento desconocido: $1"
                show_info "Usa --help para ver las opciones disponibles"
                exit 1
                ;;
        esac
    done
}

# =============================================================================
# CONFIGURACIÓN DE TRAPS Y SEÑALES
# =============================================================================

# Configurar manejo de señales
trap 'handle_interrupt' INT TERM
trap 'handle_error "Error no capturado" $LINENO' ERR

# =============================================================================
# PUNTO DE ENTRADA PRINCIPAL
# =============================================================================

# Procesar argumentos de línea de comandos
process_arguments "$@"

# Verificar que bash esté disponible y sea la versión correcta
if [ -z "$BASH_VERSION" ]; then
    echo "Error: Este script requiere Bash para funcionar correctamente"
    exit 1
fi

# Ejecutar función principal
main "$@"
