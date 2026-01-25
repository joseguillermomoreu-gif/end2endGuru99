# RESUME
This repository contains a collection of automated tests for the GURU99 website and its CMS using Playwright as the automation framework.

## System requirements
* Node.js 20+
* Windows 10+, Windows Server 2016+ or Windows Subsystem for Linux (WSL).
* MacOS 12 Monterey or MacOS 13 Ventura.
* Debian 11, Debian 12, Ubuntu 20.04 or Ubuntu 22.04.

## Installation


```bash
cd /project_root
# 1. Cambiar a Node 20
nvm use 20
# 2. Reinstalar dependencias limpias
rm -rf node_modules package-lock.json
npm ci
# 3. Reinstalar Playwright con nueva versión Node
npx playwright install --with-deps
# 4. Probar que funciona
npx playwright test --help
```

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

## using Docker
`docker container prune -f && docker volume prune -f`: Para liberar la memoria ocupada por los contenedores de docker (**solo ejecutar cuando sea necesario**)
`docker build -t e2e .`: This will create an image called e2e to run the tests.
`docker run --env-file .env --ipc=host --network=host --init e2e`: This will run all the tests.

### Procedimiento Ejecucion test Automaticos individuales desde el contenedor para construir adecuadamente las imagenes
1. Actualizarse en la rama
1. Construir el contenedor `docker build -t e2e .`
1. entrar en el contenedor con la actualizacion de los ficheros 
`sudo docker run -it --env-file .env --ipc=host --network=host --init -v ./:/END2ENDTESTS/ e2e /bin/bash`
   - ejecutar test por fichero `npx playwright test mitest.cms.spec.ts`
   - ejecutar test por tag `npx playwright test --grep @tag`
   - ejecutar test por tags (regex) `npx playwright test --grep "@tag1|@tag2"`

### Development
`sudo docker run -it --env-file .env --ipc=host --network=host --init -v ./tests:/END2ENDTESTS/tests -v ./components:/END2ENDTESTS/components e2e /bin/bash`
comando desarrollando para actualizacion de los components
- Alinear todo el fichero actual -> ctrl + mayusc + i
- Para habilitar los permisos cuando pasamos de contenedor a debuggear en IDE `sudo chmod -R 777 test-results && sudo chmod -R 777 playwright-report && sudo chmod -R 777 playwright`
