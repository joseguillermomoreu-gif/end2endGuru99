#!/bin/bash

# =============================================================================
# GESTIÓN DE ENTORNOS - End2End Tests Management
# =============================================================================
# Este módulo maneja la detección y cambio de entornos (dev/pre):
# - Detectar entorno actual desde .env
# - Cambiar entre entornos dev y pre  
# - Validar configuración de entorno
#
# 🚨 ESTADO: DESHABILITADO PARA PROYECTO GURU99
# Este proyecto solo usa producción, por lo que esta funcionalidad está
# comentada pero preservada para uso futuro.
#
# PARA HABILITAR:
# 1. Cambiar MULTIPLE_ENVIRONMENTS=true en config.sh
# 2. Descomentar todas las funciones abajo
# 3. Configurar URLs de entornos en config.sh
#
# Autor: Jose Guillermo Moreu (joseguillermomoreu@gmail.com)
# Última actualización: $(date '+%d de %B de %Y')
# =============================================================================

# 🚨 TODAS LAS FUNCIONES ESTÁN COMENTADAS - DESCOMMENTAR PARA HABILITAR

<<'ENVIRONMENT_FUNCTIONS_COMMENTED'
# Función para detectar el entorno actual desde el archivo .env
detect_environment() {
    if [ ! -f ".env" ]; then
        echo "no-env"
        return
    fi
    
    # Buscar las variables environment y domain en el archivo .env
    local env_var=$(grep "^environment=" .env | cut -d'=' -f2 | tr -d ' ')
    local domain_var=$(grep "^domain=" .env | cut -d'=' -f2 | tr -d ' ')
    
    if [[ "$env_var" == "dev" && "$domain_var" == "dev" ]]; then
        echo "dev"
    elif [[ "$env_var" == "pre" && "$domain_var" == "pre" ]]; then
        echo "pre"
    else
        echo "unknown"
    fi
}

# Función para mostrar el entorno actual
show_current_environment() {
    local current_env=$(detect_environment)
    
    show_section_title "Entorno de tests actual:"
    case $current_env in
        "dev")
            show_success "Desarrollo ($ENV_DEV_DOMAIN)"
            ;;
        "pre")
            echo -e "${BLUE}✓ Preproducción ($ENV_PRE_DOMAIN)${NC}"
            ;;
        "unknown")
            show_warning "Entorno no identificado"
            ;;
        "no-env")
            show_error "Archivo .env no encontrado"
            ;;
    esac
    
    # Exportar entorno actual para uso en otros módulos
    export CURRENT_ENV="$current_env"
    echo ""
}

# Función para manejar el cambio de entorno
handle_environment_change() {
    local current_env="$CURRENT_ENV"
    
    # Solo ofrecer cambio si el entorno es dev o pre
    if [ "$current_env" = "dev" ] || [ "$current_env" = "pre" ]; then
        show_section_title "¿Deseas cambiar el entorno de tests?"
        
        if [ "$current_env" = "dev" ]; then
            show_info "Cambiaría de desarrollo a preproducción"
        else
            show_info "Cambiaría de preproducción a desarrollo"
        fi
        
        read -p "Cambiar entorno (s/N): " CHANGE_ENV
        
        if [[ "$CHANGE_ENV" =~ ^[Ss]$ ]]; then
            if [ "$current_env" = "dev" ]; then
                change_to_preproduction
            else
                change_to_development  
            fi
        else
            show_info "Manteniendo entorno actual"
        fi
    elif [ "$current_env" = "unknown" ]; then
        show_warning "No se pudo detectar el entorno. Verifica el archivo .env"
    elif [ "$current_env" = "no-env" ]; then
        show_error "No se encontró archivo .env. Los tests podrían fallar."
    fi
    
    echo ""
}

# Función para cambiar a entorno de preproducción  
change_to_preproduction() {
    show_status "Cambiando entorno a preproducción..."
    
    if [ ! -f ".env" ]; then
        show_error "No se encontró archivo .env"
        return 1
    fi
    
    # Cambiar las variables en el archivo .env
    sed -i 's/^environment=dev/environment=pre/' .env
    sed -i 's/^domain=dev/domain=pre/' .env
    
    # Verificar que el cambio fue exitoso
    local new_env=$(detect_environment)
    if [ "$new_env" = "pre" ]; then
        show_success "Entorno cambiado a preproducción"
        export ENVIRONMENT_CHANGED=true
        export CURRENT_ENV="pre"
    else
        show_error "Error al cambiar el entorno"
        return 1
    fi
}

# Función para cambiar a entorno de desarrollo
change_to_development() {
    show_status "Cambiando entorno a desarrollo..."
    
    if [ ! -f ".env" ]; then
        show_error "No se encontró archivo .env"
        return 1
    fi
    
    # Cambiar las variables en el archivo .env
    sed -i 's/^environment=pre/environment=dev/' .env
    sed -i 's/^domain=pre/domain=dev/' .env
    
    # Verificar que el cambio fue exitoso
    local new_env=$(detect_environment)
    if [ "$new_env" = "dev" ]; then
        show_success "Entorno cambiado a desarrollo" 
        export ENVIRONMENT_CHANGED=true
        export CURRENT_ENV="dev"
    else
        show_error "Error al cambiar el entorno"
        return 1
    fi
}

# Función para mostrar el entorno en el estado final
show_final_environment_status() {
    local final_env=$(detect_environment)
    
    case $final_env in
        "dev")
            echo -e "Entorno: ${GREEN}Desarrollo ($ENV_DEV_DOMAIN)${NC}"
            ;;
        "pre")  
            echo -e "Entorno: ${BLUE}Preproducción ($ENV_PRE_DOMAIN)${NC}"
            ;;
        "unknown")
            echo -e "Entorno: ${YELLOW}No identificado${NC}"
            ;;
        "no-env")
            echo -e "Entorno: ${RED}Sin archivo .env${NC}"
            ;;
    esac
    
    export FINAL_ENV="$final_env"
}

# Función para validar configuración del entorno
validate_environment_config() {
    local env="$1"
    
    if [ ! -f ".env" ]; then
        show_error "Archivo .env requerido para ejecutar tests"
        return 1
    fi
    
    # Verificar variables críticas
    local environment=$(grep "^environment=" .env | cut -d'=' -f2)
    local domain=$(grep "^domain=" .env | cut -d'=' -f2)
    
    if [ -z "$environment" ] || [ -z "$domain" ]; then
        show_error "Variables 'environment' y 'domain' requeridas en .env"
        return 1
    fi
    
    return 0
}

# Función para crear backup del archivo .env antes de cambios
backup_env_file() {
    if [ -f ".env" ]; then
        cp .env ".env.backup.$(date +%Y%m%d_%H%M%S)"
        show_info "Backup de .env creado"
    fi
}

# Función para restaurar archivo .env desde backup más reciente
restore_env_file() {
    local latest_backup=$(ls -t .env.backup.* 2>/dev/null | head -n1)
    
    if [ -n "$latest_backup" ] && [ -f "$latest_backup" ]; then
        cp "$latest_backup" .env
        show_success "Archivo .env restaurado desde $latest_backup"
        return 0
    else
        show_error "No se encontró backup de .env para restaurar"
        return 1
    fi
}
ENVIRONMENT_FUNCTIONS_COMMENTED

# 💡 FUNCIÓN STUB PARA COMPATIBILIDAD
# Esta función vacía mantiene la compatibilidad mientras el módulo está deshabilitado
show_current_environment() {
    # Función stub - no hace nada cuando MULTIPLE_ENVIRONMENTS=false
    return 0
}
