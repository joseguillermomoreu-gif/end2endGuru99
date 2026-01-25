#!/bin/bash

# =============================================================================
# CONFIGURACIÓN GLOBAL - End2End Tests Management
# =============================================================================
# Este archivo contiene todas las constantes y configuración global
# para la gestión de tests End2EndTests.
#
# Autor: Sistema de Scripts Modular
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
    "@GIT_MASTER_COMMENTS:Comentarios Vanitatis (9.0m, 1w)"
    "@GIT_MASTER_JARVIS:Sistema Jarvis (3w)"
    "@GIT_MASTER_LEGACY:Sistema Legacy (3w)"
    "@GIT_MASTER_OTROS:Tests otros variados (3w)"
    "@GIT_MASTER_PORTADA_EC:3 balcones EC (1w)"
    "@GIT_MASTER_PORTADA_VA:3 balcones VA (1w)"
    "@GIT_MASTER_PORTADA_ALI:3 balcones ALI (1w)"
    "@GIT_COMMENTS_INICIALES:Setup comentarios (28 tests, ~3.5m)"
    "@GIT_COMENTARIOS_EC:Comentarios EC completos (29 tests)"
    "@GIT_COMENTARIOS_VA:Comentarios VA completos"
    "@GIT_COMENTARIOS_ALI:Comentarios ALI completos"
    "@GIT_PORTADA_.*_ACCESS:Setup portadas (111 tests, ~27m con 2w)"
    "@GIT_PORTADA_.*ALI_01:Portadas ALI (24 tests, ~18.7m)"
    "@GIT_JARVIS:Jarvis completo (recomendado: 9w)"
    "@GIT_LEGACY:Legacy completo (recomendado: 11w)"
    "@GIT_OTROS:Otros completo (recomendado: 6w)"
    "@GIT_OTROS_USER:User Area específico"
    "@GIT_OTROS_SEC:Secciones específico"
    "@GIT_OTROS_ECPREV:EC Premium específico"
)

# Configuración de workers permitidos
export MIN_WORKERS=1
export MAX_WORKERS=16

# Configuración de entornos
export ENV_DEV="dev"
export ENV_PRE="pre"
export ENV_DEV_DOMAIN="elconfidencial.dev"
export ENV_PRE_DOMAIN="pre.elconfidencial.com"

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
