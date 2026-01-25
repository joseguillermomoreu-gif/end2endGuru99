#!/bin/bash

# =============================================================================
# COLORES Y UTILIDADES DE DISPLAY - End2End Tests Management
# =============================================================================
# Este módulo define todos los colores y utilidades para mejorar la presentación
# visual del script en la terminal.
#
# Autor: Jose Guillermo Moreu (jgmoreu@gmail.com) 
# Última actualización: $(date '+%d de %B de %Y')
# =============================================================================

# Definición de colores para output del terminal
export RED='\033[0;31m'
export GREEN='\033[0;32m'  
export YELLOW='\033[1;33m'
export BLUE='\033[0;34m'
export PURPLE='\033[0;35m'
export CYAN='\033[0;36m'
export WHITE='\033[1;37m'
export NC='\033[0m' # No Color

# Colores adicionales para casos especiales
export BRIGHT_RED='\033[1;31m'
export BRIGHT_GREEN='\033[1;32m'
export BRIGHT_BLUE='\033[1;34m'
export BRIGHT_YELLOW='\033[1;33m'

# Función para mostrar separador principal
show_main_separator() {
    local title="$1"
    echo -e "${BLUE}======================================${NC}"
    echo -e "${BLUE}$title${NC}"
    echo -e "${BLUE}======================================${NC}"
}

# Función para mostrar separador secundario  
show_secondary_separator() {
    local title="$1"
    echo -e "${GREEN}======================================${NC}"
    echo -e "${GREEN}$title${NC}"
    echo -e "${GREEN}======================================${NC}"
}

# Función para mostrar separador informativo
show_info_separator() {
    local title="$1"
    echo -e "${YELLOW}======================================${NC}"
    echo -e "${YELLOW}$title${NC}"
    echo -e "${YELLOW}======================================${NC}"
}

# Función para mostrar mensaje de éxito
show_success() {
    local message="$1"
    echo -e "${GREEN}✓ $message${NC}"
}

# Función para mostrar mensaje de error
show_error() {
    local message="$1"  
    echo -e "${RED}✗ $message${NC}"
}

# Función para mostrar mensaje de advertencia
show_warning() {
    local message="$1"
    echo -e "${YELLOW}⚠️  $message${NC}"
}

# Función para mostrar mensaje informativo
show_info() {
    local message="$1"
    echo -e "${BLUE}$message${NC}"
}

# Función para mostrar estado/progreso
show_status() {
    local message="$1"
    echo -e "${CYAN}$message${NC}"
}

# Función para mostrar comandos ejecutables
show_command() {
    local command="$1"
    echo -e "${BLUE}Ejecutando: $command${NC}"
}

# Función para mostrar título de sección
show_section_title() {
    local title="$1"
    echo -e "${YELLOW}$title${NC}"
}

# Función para limpiar pantalla manteniendo título
clear_with_title() {
    local title="$1"
    clear
    if [ -n "$title" ]; then
        show_main_separator "$title"
        echo ""
    fi
}

# Función para esperar entrada del usuario con mensaje
wait_for_user() {
    local message="${1:-Presiona Enter para continuar...}"
    echo ""
    read -p "$message"
}

# Función para mostrar lista numerada con colores
show_numbered_list() {
    local -a items=("$@")
    local i=1
    
    for item in "${items[@]}"; do
        echo -e "${YELLOW}$i)${NC} $item"
        ((i++))
    done
}

# Función para mostrar progreso simple
show_progress() {
    local step="$1"
    local total="$2"  
    local message="$3"
    
    echo -e "${CYAN}[$step/$total] $message${NC}"
}

# Función para mostrar banner de inicio
show_startup_banner() {
    echo -e "${BLUE}╔══════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║    End2End Tests - Gestión Guru99     ║${NC}"
    echo -e "${BLUE}║         Script Interactivo             ║${NC}"
    echo -e "${BLUE}╚══════════════════════════════════════╝${NC}"
    echo ""
}

# Función para mostrar mensaje de finalización
show_completion_banner() {
    echo ""
    show_secondary_separator "           Proceso completado         "
}
