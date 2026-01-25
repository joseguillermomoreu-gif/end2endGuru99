#!/bin/bash

# =============================================================================
# CONFIGURACIÓN GLOBAL - End2End Tests Management
# =============================================================================
# Este archivo contiene todas las constantes y configuración global
# para la gestión de tests End2EndTests.
#
# Autor: Jose Guillermo Moreu (joseguillermomoreu@gmail.com)
# Última actualización: $(date '+%d de %B de %Y')
# =============================================================================

# Detectar directorio del proyecto automáticamente
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export PROJECT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"

# Nombre de la imagen Docker
export DOCKER_IMAGE_NAME="e2e"

# Variables globales para el estado del script
export ENVIRONMENT_CHANGED=false
export CONTAINER_BUILT=false
export USED_CUSTOM_TAG=""

# Configuración de tags de tests por defecto
export DEFAULT_TAGS=(
    "@smoke:Tests de humo principales (rápidos)"
    "@regression:Tests de regresión completos"
    "@login:Tests de autenticación y login"
    "@customer:Tests de gestión de clientes"
    "@navigation:Tests de navegación web"
    "@forms:Tests de formularios"
    "@ui:Tests de interfaz de usuario"
    "@api:Tests de API endpoints"
    "@integration:Tests de integración"
    "@ppia:Tests PPIA autogenerados"
    "tests/ppia/:Todos los tests PPIA"
    "tests/login/:Tests de directorio login"
    "tests/customer/:Tests de directorio customer"
    "tests/home/:Tests de directorio home"
    "'crear nuevo customer':Tests con texto específico"
    "'validacion':Tests de validación"
    "'titulo':Tests que validen títulos"
    ".*guru99.*:Regex para tests de Guru99"
)

# Configuración de workers permitidos
export MIN_WORKERS=1
export MAX_WORKERS=16

# Configuración de entornos
export ENV_DEV="dev"
export ENV_PRE="pre"
export ENV_DEV_DOMAIN="demo.guru99.com"
export ENV_PRE_DOMAIN="demo.guru99.com"

# Control de gestión de múltiples entornos
# NOTA: Este proyecto solo usa producción. Para habilitar gestión de entornos:
# 1. Cambiar MULTIPLE_ENVIRONMENTS=true
# 2. Descomentar funciones en environment.sh
# 3. Configurar URLs de entornos arriba
export MULTIPLE_ENVIRONMENTS=false

# Archivos temporales
export TEMP_SCRIPT_DIR="/tmp"
export RUN_TESTS_SCRIPT="$TEMP_SCRIPT_DIR/run_tests.sh"
export REPEAT_TESTS_SCRIPT="$TEMP_SCRIPT_DIR/repeat_tests.sh"

# Función para verificar que estamos en el directorio correcto
verify_project_directory() {
    if [ ! -d "$PROJECT_DIR" ]; then
        echo -e "${RED}Error: El directorio $PROJECT_DIR no existe${NC}"
        exit 1
    fi
    
    if [ ! -d "$PROJECT_DIR/.git" ]; then
        echo -e "${RED}Error: $PROJECT_DIR no es un repositorio git válido${NC}"
        exit 1
    fi
    
    # Cambiar al directorio del proyecto si no estamos ya ahí
    if [ "$(pwd)" != "$PROJECT_DIR" ]; then
        cd "$PROJECT_DIR" || exit 1
    fi
}

# Función para limpiar archivos temporales
cleanup_temp_files() {
    [ -f "$RUN_TESTS_SCRIPT" ] && rm -f "$RUN_TESTS_SCRIPT"
    [ -f "$REPEAT_TESTS_SCRIPT" ] && rm -f "$REPEAT_TESTS_SCRIPT"
}

# Función para validar entrada numérica en un rango
validate_numeric_input() {
    local input="$1"
    local min="$2"
    local max="$3"
    
    if [[ "$input" =~ ^[0-9]+$ ]] && [ "$input" -ge "$min" ] && [ "$input" -le "$max" ]; then
        return 0
    else
        return 1
    fi
}
