#!/bin/bash

# =============================================================================
# OPERACIONES GIT - End2End Tests Management
# =============================================================================
# Este módulo maneja todas las operaciones relacionadas con Git:
# - Mostrar estado del repositorio
# - Cambio de ramas
# - Actualización del repositorio (fetch/pull)
# - Verificación de cambios pendientes
#
# Autor: Sistema de Scripts Modular
# Última actualización: $(date '+%d de %B de %Y')
# =============================================================================

# Función para mostrar el estado actual del repositorio
show_repository_status() {
    show_section_title "Estado actual del repositorio:"
    
    local current_branch=$(git branch --show-current)
    local last_commit=$(git log -1 --oneline)
    
    echo -e "Rama actual: ${GREEN}$current_branch${NC}"
    echo -e "Último commit: ${GREEN}$last_commit${NC}"
    echo ""
    
    # Exportar variables para uso en otros módulos
    export CURRENT_BRANCH="$current_branch"
    export LAST_COMMIT="$last_commit"
}

# Función para mostrar git status completo
show_git_status() {
    show_section_title "Estado de los archivos (git status):"
    
    local git_status=$(git status --porcelain)
    if [ -z "$git_status" ]; then
        show_success "Working tree limpio - no hay cambios pendientes"
    else
        show_warning "Hay cambios pendientes:"
        git status --short
    fi
    echo ""
    
    # Exportar estado para uso posterior
    export CURRENT_GIT_STATUS="$git_status"
}

# Función para seleccionar y cambiar de rama
handle_branch_selection() {
    local current_branch="$CURRENT_BRANCH"
    
    show_section_title "Selecciona una opción:"
    echo "1) Cambiar a develop"
    echo "2) Cambiar a master"  
    echo "3) Mantener rama actual ($current_branch)"
    echo ""
    
    read -p "Selecciona una opción (1-3) [3]: " BRANCH_OPTION
    
    # Establecer valor por defecto
    if [ -z "$BRANCH_OPTION" ]; then
        BRANCH_OPTION=3
    fi
    
    # Determinar la rama objetivo
    case $BRANCH_OPTION in
        1)
            TARGET_BRANCH="develop"
            ;;
        2)
            TARGET_BRANCH="master"
            ;;
        3)
            TARGET_BRANCH="$current_branch"
            ;;
        *)
            show_error "Opción inválida. Manteniendo rama actual."
            TARGET_BRANCH="$current_branch"
            ;;
    esac
    
    # Cambiar de rama si es necesario
    if [ "$TARGET_BRANCH" != "$current_branch" ]; then
        show_status "Cambiando a la rama $TARGET_BRANCH..."
        if git checkout "$TARGET_BRANCH"; then
            show_success "Cambio exitoso a $TARGET_BRANCH"
            export CURRENT_BRANCH="$TARGET_BRANCH"
        else
            show_error "Error al cambiar a $TARGET_BRANCH"
            exit 1
        fi
    else
        show_info "Manteniendo rama actual: $current_branch"
    fi
    
    echo ""
    export TARGET_BRANCH
}

# Función para actualizar el repositorio
handle_repository_update() {
    local target_branch="${TARGET_BRANCH:-$CURRENT_BRANCH}"
    
    show_section_title "¿Deseas actualizar la rama $target_branch?"
    read -p "Actualizar rama (s/N): " UPDATE_BRANCH
    
    if [[ "$UPDATE_BRANCH" =~ ^[Ss]$ ]]; then
        show_status "Actualizando repositorio..."
        
        # Git fetch
        echo "Ejecutando git fetch..."
        if git fetch; then
            show_success "git fetch exitoso"
        else
            show_error "Error en git fetch"
            exit 1
        fi
        
        # Git pull
        echo "Ejecutando git pull..."
        if git pull; then
            show_success "git pull exitoso"
        else
            show_error "Error en git pull"
            exit 1
        fi
        
        # Mostrar estado actualizado
        show_section_title "Estado después de la actualización:"
        local new_last_commit=$(git log -1 --oneline)
        echo -e "Rama: ${GREEN}$target_branch${NC}"
        echo -e "Último commit: ${GREEN}$new_last_commit${NC}"
        
        # Actualizar variable exportada
        export LAST_COMMIT="$new_last_commit"
    else
        show_info "Manteniendo estado actual del repositorio"
    fi
    
    echo ""
}

# Función para mostrar el estado final del repositorio
show_final_repository_status() {
    show_section_title "Estado final:"
    
    local final_branch=$(git branch --show-current)
    local final_commit=$(git log -1 --oneline)
    
    echo -e "Rama final: ${GREEN}$final_branch${NC}"
    echo -e "Último commit: ${GREEN}$final_commit${NC}"
    
    # Verificar cambios no commitados al final
    local final_git_status=$(git status --porcelain)
    if [ -z "$final_git_status" ]; then
        show_success "Working tree limpio"
    else
        show_warning "Cambios no commitados:"
        git status --short
    fi
    
    # Exportar estado final
    export FINAL_BRANCH="$final_branch"
    export FINAL_COMMIT="$final_commit"
    export FINAL_GIT_STATUS="$final_git_status"
}

# Función para verificar que es un repositorio git válido
verify_git_repository() {
    if [ ! -d ".git" ]; then
        show_error "$PROJECT_DIR no es un repositorio git válido"
        exit 1
    fi
}

# Función para obtener información de ramas disponibles
get_available_branches() {
    git branch -r | grep -E "(origin/develop|origin/master)" | sed 's/origin\///' | sort
}

# Función para verificar si hay cambios sin commitear
has_uncommitted_changes() {
    local status=$(git status --porcelain)
    if [ -n "$status" ]; then
        return 0  # Hay cambios
    else
        return 1  # No hay cambios
    fi
}

# Función para mostrar información detallada de commits
show_commit_history() {
    local count="${1:-5}"
    show_section_title "Últimos $count commits:"
    git log --oneline -n "$count"
    echo ""
}
