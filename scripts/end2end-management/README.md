# Sistema de Gestión End2EndTests - Modular

## Descripción

Este es el **sistema modular de gestión** para el proyecto End2EndTests. Ha sido diseñado para proporcionar una gestión completa, mantenible y escalable de todos los aspectos del testing automatizado con Playwright.

## Características Principales

- ✅ **Modular**: Cada funcionalidad en su propio módulo especializado
- ✅ **Versionado**: Scripts commiteados junto con el código de testing
- ✅ **Mantenible**: Fácil modificar y extender funcionalidades específicas
- ✅ **Colaborativo**: Otros desarrolladores pueden contribuir fácilmente
- ✅ **Retrocompatible**: Mantiene la misma interfaz que el script anterior
- ✅ **Robusto**: Manejo avanzado de errores y limpieza automática

## Estructura del Sistema

```
scripts/end2end-management/
├── main.sh                    # 🎯 Coordinador principal del flujo
├── config.sh                  # ⚙️  Configuración global y constantes
└── modules/                   # 📦 Módulos especializados
    ├── colors.sh              # 🎨 Utilidades de presentación y colores
    ├── git_operations.sh      # 🔧 Operaciones Git (branch, pull, status)
    ├── environment.sh         # 🌍 Gestión de entornos (dev/pre)
    ├── docker_operations.sh   # 🐳 Operaciones Docker (build, run, cleanup)
    ├── test_execution.sh      # 🧪 Ejecución y gestión de tests
    └── reporting.sh           # 📊 Reportes y estado final
```

## Instalación

### 1. Asignar Permisos de Ejecución

```bash
# Ejecutar el script de configuración de permisos
cd /var/www/EC2/code/End2EndTests/
chmod +x setup_permissions.sh
./setup_permissions.sh
```

### 2. Verificar la Instalación

```bash
# Verificar que el script principal funciona
./end2end.sh --version

# Ver todas las opciones disponibles
./end2end.sh --help
```

## Uso

### Uso Básico (Interactivo)

```bash
# Desde el proyecto End2EndTests
cd /var/www/EC2/code/End2EndTests/
./end2end.sh

# O desde /var/www/scripts/ (redirección automática)
cd /var/www/scripts/
./end2end.sh
```

### Opciones Avanzadas

```bash
# Ver ayuda completa
./end2end.sh --help

# Mostrar información de versión
./end2end.sh --version

# Modo simulación (ver qué haría sin ejecutar)
./end2end.sh --dry-run

# Modo verboso (debug detallado)
./end2end.sh --verbose

# Modo automático (responde 'sí' a todas las preguntas)
./end2end.sh --auto-yes

# Saltar operaciones Docker
./end2end.sh --skip-docker

# Saltar operaciones Git
./end2end.sh --skip-git

# Modo silencioso (solo errores)
./end2end.sh --quiet
```

## Funcionalidades por Módulo

### 🎯 main.sh - Coordinador Principal
- Orquesta todo el flujo de ejecución
- Maneja argumentos de línea de comandos
- Gestiona señales y errores
- Configura traps para limpieza automática

### ⚙️ config.sh - Configuración Global
- Constantes del proyecto (rutas, nombres de imágenes)
- Variables globales compartidas
- Funciones de utilidad común
- Validaciones de entrada

### 🎨 colors.sh - Utilidades de Presentación
- Definición de colores para terminal
- Funciones de presentación (separadores, banners)
- Utilidades de mensaje (éxito, error, advertencia)
- Funciones de formato y limpieza de pantalla

### 🔧 git_operations.sh - Operaciones Git
- Mostrar estado del repositorio
- Cambio de ramas (develop/master)
- Actualización del repositorio (fetch/pull)
- Verificación de cambios pendientes
- Historial de commits

### 🌍 environment.sh - Gestión de Entornos
- Detección automática de entorno desde .env
- Cambio entre entornos dev y pre
- Backup y restauración de archivos .env
- Validación de configuración de entorno

### 🐳 docker_operations.sh - Operaciones Docker
- Verificación de imágenes existentes
- Construcción de contenedores
- Ejecución de contenedores para tests
- Scripts temporales para contenedores
- Limpieza de recursos Docker
- Bucle de repetición de tests

### 🧪 test_execution.sh - Ejecución de Tests
- Menú interactivo de selección de tests
- Gestión de tags personalizados
- Configuración de workers y logs
- Información detallada de tags disponibles
- Validación de configuración de tests

### 📊 reporting.sh - Reportes y Estado Final
- Estado final del repositorio y entorno
- Comandos útiles para ejecución manual
- Estadísticas del proyecto
- Exportación de resúmenes (TXT/JSON)
- Próximos pasos sugeridos

## Flujo de Ejecución

1. **Setup y Verificación**
   - Verificar prerrequisitos
   - Validar directorio y repositorio git

2. **Estado Inicial**
   - Mostrar información del repositorio
   - Estado de archivos (git status)
   - Entorno actual (dev/pre)

3. **Gestión Git**
   - Selección de rama
   - Actualización del repositorio

4. **Gestión de Entorno**
   - Cambio de entorno si se requiere

5. **Gestión Docker**
   - Construcción de contenedor si es necesario

6. **Ejecución de Tests**
   - Selección de tests
   - Configuración avanzada
   - Ejecución en contenedor
   - Posibilidad de repetición

7. **Reportes Finales**
   - Estado final del sistema
   - Comandos útiles
   - Limpieza automática

## Desarrollo y Contribuciones

### Añadir Nueva Funcionalidad

1. **Crear nuevo módulo** en `modules/`
2. **Implementar funciones** siguiendo el patrón existente
3. **Importar en main.sh** con `source`
4. **Integrar en el flujo** principal
5. **Documentar** en este README

### Ejemplo de Nuevo Módulo

```bash
# modules/nuevo_modulo.sh
#!/bin/bash

# Función principal del módulo
nueva_funcionalidad() {
    show_section_title "Nueva funcionalidad"
    # Implementación aquí...
    show_success "Funcionalidad ejecutada"
}

# Exportar funciones para uso externo
export -f nueva_funcionalidad
```

### Mejores Prácticas

- ✅ **Usar colores definidos** en colors.sh
- ✅ **Manejar errores** apropiadamente
- ✅ **Validar entrada** del usuario
- ✅ **Documentar funciones** con comentarios
- ✅ **Seguir el patrón** de naming establecido
- ✅ **Limpiar recursos** temporales
- ✅ **Exportar variables** necesarias

## Solución de Problemas

### Script no ejecutable
```bash
chmod +x /var/www/EC2/code/End2EndTests/end2end.sh
chmod +x /var/www/EC2/code/End2EndTests/scripts/end2end-management/main.sh
```

### Error "Módulo no encontrado"
```bash
# Verificar que todos los módulos existen
ls -la /var/www/EC2/code/End2EndTests/scripts/end2end-management/modules/
```

### Problemas con Docker
```bash
# Verificar que Docker está funcionando
docker --version
docker images
```

### Problemas con Git
```bash
# Verificar estado del repositorio
cd /var/www/EC2/code/End2EndTests/
git status
git branch -a
```

## Logs y Debugging

### Activar Modo Verboso
```bash
./end2end.sh --verbose
```

### Modo Simulación
```bash
./end2end.sh --dry-run
```

### Verificar Variables de Entorno
El script exporta múltiples variables que pueden ser útiles para debugging:
- `PROJECT_DIR`
- `CURRENT_BRANCH`
- `CURRENT_ENV`
- `CONTAINER_BUILT`
- `ENVIRONMENT_CHANGED`

## Migración desde Script Anterior

El sistema modular es **100% retrocompatible**. Los usuarios existentes pueden continuar usando:

```bash
# Sigue funcionando como antes
/var/www/scripts/end2endTestsJueves.sh
```

El script anterior redirige automáticamente al nuevo sistema modular.

## Versionado

Este sistema sigue las siguientes convenciones:
- **Major**: Cambios incompatibles en la interfaz
- **Minor**: Nuevas funcionalidades compatibles
- **Patch**: Correcciones de bugs

**Versión actual**: 1.0.0

## Contribuciones

Para contribuir al sistema:

1. **Fork** del proyecto End2EndTests
2. **Crear branch** para tu feature: `git checkout -b feature/nueva-funcionalidad`
3. **Modificar módulos** correspondientes
4. **Probar** exhaustivamente
5. **Commitear** cambios: `git commit -m "feat: añadir nueva funcionalidad"`
6. **Push** al branch: `git push origin feature/nueva-funcionalidad`
7. **Crear Pull Request**

---

**Autor**: Sistema de Scripts Modular  
**Última actualización**: 7 de agosto de 2025  
**Versión**: 1.0.0
