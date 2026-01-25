#!/bin/bash

# =============================================================================
# END2ENDTESTS - Script de Entrada Principal
# =============================================================================
# Este script es el punto de entrada principal para la gestión de tests
# End2EndTests Guru99. Redirige la ejecución al sistema modular ubicado en
# scripts/end2end-management/
#
# Uso: ./end2end.sh [opciones]
#      ./end2end.sh --u              (update screenshots)
#      ./end2end.sh --headed          (modo headed con selección de navegador)
#
# Autor: Sistema de Scripts Modular
# Última actualización: $(date '+%d de %B de %Y')
# =============================================================================

# Obtener el directorio donde está ubicado este script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Ruta al script principal modular
MAIN_SCRIPT="$SCRIPT_DIR/scripts/end2end-management/main.sh"

# Verificar que el script principal existe
if [ ! -f "$MAIN_SCRIPT" ]; then
    echo "Error: No se encontró el script principal en: $MAIN_SCRIPT"
    echo "Asegúrate de que la estructura modular esté correctamente instalada"
    echo ""
    echo "Estructura esperada:"
    echo "  $(basename "$SCRIPT_DIR")/"
    echo "  ├── end2end.sh (este script)"
    echo "  └── scripts/"
    echo "      └── end2end-management/"
    echo "          ├── main.sh"
    echo "          ├── config.sh"
    echo "          └── modules/"
    echo "              ├── colors.sh"
    echo "              ├── git_operations.sh"
    echo "              ├── environment.sh"
    echo "              ├── docker_operations.sh"
    echo "              ├── test_execution.sh"
    echo "              └── reporting.sh"
    echo ""
    exit 1
fi

# Verificar que el script principal tiene permisos de ejecución
if [ ! -x "$MAIN_SCRIPT" ]; then
    chmod +x "$MAIN_SCRIPT" 2>/dev/null || {
        echo "Error: No se pudo hacer ejecutable el script principal"
        echo "Ejecuta manualmente: chmod +x '$MAIN_SCRIPT'"
        exit 1
    }
fi

# Auto-asignar permisos de ejecución a este script si es necesario
chmod +x "$0" 2>/dev/null || true

# Cambiar al directorio del proyecto (donde está este script)
cd "$SCRIPT_DIR" || {
    echo "Error: No se pudo cambiar al directorio del proyecto: $SCRIPT_DIR"
    exit 1
}

# Verificar que estamos en un proyecto End2EndTests válido
if [ ! -f "playwright.config.ts" ] && [ ! -f "playwright.config.js" ]; then
    echo "Advertencia: No se encontró playwright.config.ts/js"
    echo "¿Estás seguro de que estás en el directorio correcto del proyecto End2EndTests?"
    echo "Directorio actual: $SCRIPT_DIR"
    echo ""
    read -p "¿Continuar de todos modos? (s/N): " CONTINUE_ANYWAY
    if [[ ! "$CONTINUE_ANYWAY" =~ ^[Ss]$ ]]; then
        echo "Operación cancelada"
        exit 1
    fi
fi

# Mostrar información del sistema (solo en modo verbose)
if [[ "$*" =~ --verbose ]]; then
    echo "=== INFORMACIÓN DEL SISTEMA ==="
    echo "Script de entrada: $0"
    echo "Script principal: $MAIN_SCRIPT"
    echo "Directorio de trabajo: $SCRIPT_DIR"
    echo "Usuario: $(whoami)"
    echo "Fecha: $(date)"
    if command -v git >/dev/null 2>&1 && [ -d ".git" ]; then
        echo "Branch Git: $(git branch --show-current 2>/dev/null || echo 'desconocido')"
    fi
    echo "=============================="
    echo ""
fi

# Ejecutar el script principal con todos los argumentos pasados
exec "$MAIN_SCRIPT" "$@"
