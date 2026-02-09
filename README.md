# RESUME
This repository contains a collection of automated tests for the GURU99 website and its CMS using Playwright as the automation framework.

## System requirements
* Node.js 20+
* Windows 10+, Windows Server 2016+ or Windows Subsystem for Linux (WSL).
* MacOS 12 Monterey or MacOS 13 Ventura.
* Debian 11, Debian 12, Ubuntu 20.04 or Ubuntu 22.04.

## Installation

### Opción 1: Docker (Recomendado ✅)

```bash
# Construir imagen Docker con Node 20 + Playwright
docker build -t e2e .

# Ejecutar tests
docker run --env-file .env --ipc=host --network=host --init e2e
```

Ver sección [Using Docker](#using-docker-recommended) para más detalles.

### Opción 2: Local (Desarrollo IDE)

```bash
cd /project_root

# 1. Cambiar a Node 20
source ~/.nvm/nvm.sh && nvm use 20
nvm alias default 20

# 2. Reinstalar dependencias limpias
rm -rf node_modules package-lock.json
npm ci

# 3. Reinstalar Playwright con nueva versión Node
npx playwright install --with-deps

# 4. Probar que funciona
npx playwright test --help
```

⚠️ **Nota:** Aunque puedes ejecutar localmente, **la forma recomendada es usar Docker** para consistencia entre entornos.

## Script de gestión (end2end.sh)

Este proyecto incluye un script wrapper que facilita la ejecución y gestión de tests.

### Configuración inicial
```bash
# Dar permisos de ejecución al script
chmod +x end2end.sh
```

### Uso del script
```bash
# Menú interactivo (recomendado)
./end2end.sh

# Opciones avanzadas
./end2end.sh --u           # Actualizar screenshots automáticamente
./end2end.sh --headed      # Modo headed con selección de navegador
./end2end.sh --help        # Ver todas las opciones disponibles
```

### Funcionalidades del script
- **Menú interactivo**: Selección fácil de tests y configuraciones
- **Selección de navegador**: En modo headed puedes elegir Chromium, Firefox o ambos
- **Update screenshots**: Opción `--u` para actualizar snapshots automáticamente
- **Configuración workers**: Control de paralelización de tests
- **Logs detallados**: Opción para mostrar logs de éxito
- **Detección automática**: Encuentra y lista tests disponibles en el proyecto

## Error al no detectar los tests en IDE
Se debe ejecutar en la terminal los siguientes comandos:
1. Cambiar a la versión 20 `nvm use 20`
1. Establecer la versión 20 como predeterminada `nvm alias default 20`
1. ejecutar los comandos habituales:
   - `npm ci`
   - `npx playwright install --with-deps`
1. Reiniciar el IDE.

## Test execution
`npx playwright test`: This will run your tests on all browsers as configured in the playwright.config file. Tests run in headless mode by default meaning no browser window will be opened while running the tests and results will be seen in the terminal.
`npx playwright show-report`: A quick way of opening the last test run report.
`npx eslint .`: ESLint will lint all TypeScript compatible files within the current folder, and will output the results to your terminal.

### Running in CI
For executing tests in a CI environment, ensure that the environment variable LINE_REPORT is set to true in order to enable the Line Report feature.

## Using Docker (Recommended)

⚠️ **IMPORTANTE:** Todos los tests deben ejecutarse desde Docker, tanto en local como en CI.

### Build de la imagen

```bash
# Limpiar contenedores y volúmenes antiguos (opcional)
docker container prune -f && docker volume prune -f

# Construir imagen (usa Node 20 + Playwright)
docker build -t e2e .
```

### Ejecutar tests

```bash
# Todos los tests
docker run --env-file .env --ipc=host --network=host --init e2e

# Tests específicos
docker run --env-file .env --ipc=host --network=host --init e2e \
  npx playwright test --project="Login Tests Admin - Chrome"

# Setup + QA tests
docker run --env-file .env --ipc=host --network=host --init e2e \
  npx playwright test --project="Setup Authentication" --project="Login Tests Admin - Chrome"
```

### Modo interactivo (desarrollo)

```bash
# Entrar al contenedor con shell
docker run -it --env-file .env --ipc=host --network=host --init \
  -v ./:/END2ENDTESTS/ \
  e2e /bin/bash

# Dentro del contenedor:
npx playwright test                                    # Todos los tests
npx playwright test tests/customer/customer.login.spec.ts  # Test específico
npx playwright test --grep @tag                       # Por tag
npx playwright test --grep "@tag1|@tag2"              # Múltiples tags
npx playwright test --headed                          # Con browser visible
```

### Desarrollo con hot-reload

```bash
# Montar solo carpetas de código (más rápido)
docker run -it --env-file .env --ipc=host --network=host --init \
  -v ./tests:/END2ENDTESTS/tests \
  -v ./components:/END2ENDTESTS/components \
  -v ./features:/END2ENDTESTS/features \
  -v ./step-definitions:/END2ENDTESTS/step-definitions \
  e2e /bin/bash
```

### Permisos después de ejecutar

```bash
# Cambiar permisos de archivos generados por Docker
sudo chmod -R 777 test-results
sudo chmod -R 777 playwright-report
sudo chmod -R 777 playwright/.auth
```

### Verificación

```bash
# Verificar versión de Node en la imagen
docker run --rm e2e node --version
# Debe mostrar: v20.x.x

# Verificar Playwright instalado
docker run --rm e2e npx playwright --version
```
