# CLAUDE.md - Proyecto end2endGuru99

> **Contexto específico del proyecto E2E Testing con PPIA**
>
> Este archivo complementa el CLAUDE.md global de `~/.claude/`

---

## 🎯 Propósito del Proyecto

Este es el **proyecto principal de E2E Testing** donde:
- ✅ Se ejecutan y prueban las herramientas de **PPIA** (agente generador de tests)
- ✅ Se desarrollan tests automatizados para Guru99 Bank demo
- ✅ Se experimenta con Playwright + TypeScript + Cucumber
- ✅ Proyecto público en GitHub: https://github.com/joseguillermomoreu-gif/end2endGuru99

**Stack:**
- Playwright 1.43.1
- TypeScript 5.2.2
- Cucumber 10.0.1
- Node.js 20+

---

## ⚠️ Estado Actual (2026-02-09)

### Tests de Customer - DESHABILITADOS PERMANENTEMENTE

**Razón:** El usuario de pruebas (`mngr652417`) caducará pronto y se perderá acceso al panel de control.

**Tests afectados (marcados como `.skip()`):**
1. **Cucumber BDD**: `tests/cucumber/cucumber-customer.spec.ts`
2. **Playwright**: `tests/customer/customer.login.spec.ts` (5 tests)
3. **PPIA**: 15 archivos generados en `tests/ppia/testsPPIA-4-*`

**Total:** 21+ tests skipped

### CI/CD - Cron Deshabilitado

- ❌ Ejecución automática nocturna (03:00 UTC) **DESHABILITADA**
- ✅ Ahorro de GitHub Actions
- ✅ Solo ejecución manual o en push a master

---

## 🤖 PPIA - Agente Generador de Tests

### ¿Qué es PPIA?

**PPIA v0.1.0** es mi agente de IA para **generación automática de tests E2E**.

**Características:**
- Analiza páginas web y genera código Playwright funcional
- 3 estrategias diferentes de análisis por test
- Genera selectores automáticamente
- Output: Código TypeScript puro ejecutable

**Proceso:**
- Análisis iterativo del HTML (5-17 iteraciones)
- Consumo: 1,500-5,300 tokens OpenAI por test
- Tiempo: 40-330 segundos por test
- Resultado: `.generated.spec.ts` funcional

### Tests PPIA Actuales

```
tests/ppia/
├── testsPPIA-4-acceso/     # Login + acceso dashboard (3 archivos)
├── testsPPIA-4-crear/      # Crear customer (3 archivos) ⚠️ SKIPPED
├── testsPPIA-4-reset/      # Reset formulario (3 archivos) ⚠️ SKIPPED
├── testsPPIA-4-required/   # Campos obligatorios (3 archivos) ⚠️ SKIPPED
├── testsPPIA-4-minchar/    # Validación mínimo caracteres (3 archivos) ⚠️ SKIPPED
└── testsPPIA-4-invalid/    # Validación campos inválidos (3 archivos) ⚠️ SKIPPED
```

**Total:** 18 tests PPIA (15 skipped)

**Documentación:** Ver `tests/ppia/README.md`

---

## 📁 Estructura del Proyecto

```
/home/jgmoreu/Desktop/akkodis/izertis/
├── tests/
│   ├── customer/           # Tests Playwright customer (skipped)
│   ├── home/               # Tests home page
│   ├── login/              # Tests login
│   ├── ppia/               # Tests generados por PPIA
│   ├── setup/              # Auth setup
│   └── cucumber/           # Wrappers Cucumber
│
├── features/               # Gherkin features (BDD)
│   ├── customer/           # Features customer
│   ├── home/               # Features home
│   └── login/              # Features login
│
├── step-definitions/       # Cucumber steps
│   ├── customer/           # Steps customer
│   ├── home/               # Steps home
│   ├── login/              # Steps login
│   ├── setup/              # Steps setup
│   └── common/             # Steps comunes
│
├── components/             # Page Objects / Selectores
│   └── guru99/
│       ├── home/
│       ├── login/
│       ├── menuLeft/
│       └── customer/
│
├── support/                # Cucumber support files
│   ├── hooks-bdd.ts        # Hooks Cucumber
│   ├── world.ts            # World context
│   └── data/               # Test data
│
├── scripts/                # Scripts bash
│   └── end2end-management/ # Módulos gestión E2E
│
└── .github/workflows/      # GitHub Actions
    └── nightly-tests.yml   # CI/CD (cron deshabilitado)
```

---

## 🚀 Comandos Útiles

### Tests Playwright (Estándar)

```bash
# Todos los tests
npx playwright test

# Por proyecto
npx playwright test --project="Login Tests Admin - Chrome"
npx playwright test --project="Test PPIA - Chrome"

# Tests específicos
npx playwright test tests/login/
npx playwright test tests/customer/customer.login.spec.ts

# Modo UI
npx playwright test --ui

# Modo headed
npx playwright test --headed

# Ver report
npx playwright show-report
```

### Tests Cucumber (BDD)

```bash
# Todos los BDD
npm run test:cucumber

# Solo customer (skipped, no ejecutará nada útil)
npm run test:cucumber:customer

# Smoke tests
npm run test:bdd:smoke

# Regression
npm run test:bdd:regression

# Por tags
npm run test:bdd:tags "@home and not @slow"

# Generar reporte
npm run test:generate-report
```

### Tests PPIA

```bash
# Todos los PPIA Chrome
npx playwright test --project="Test PPIA - Chrome"

# Todos los PPIA Firefox
npx playwright test --project="Test PPIA - Firefox"

# Test individual PPIA
npx playwright test tests/ppia/testsPPIA-4-acceso/test-strategy1-*.spec.ts
```

### Script Bash (end2end.sh)

```bash
# Menú interactivo
./end2end.sh

# Headed con selección de navegador
./end2end.sh --headed

# Update screenshots
./end2end.sh --u

# Help
./end2end.sh --help
```

### Linting

```bash
# Verificar
npm run lint

# Autofix
npm run lint:fix
```

---

## 🔀 Workflow Git

### Ramas Principales

```
master   → Producción (CI activado, solo push manual o workflow_dispatch)
develop  → Desarrollo (CI NO activado)
```

### Crear Feature/Hotfix

```bash
# Feature
git checkout develop
git checkout -b feature/nombre-descriptivo
# ... trabajo ...
git checkout develop
git merge feature/nombre-descriptivo
git push origin develop

# Hotfix (sale de master)
git checkout master
git checkout -b hotfix/nombre-descriptivo
# ... trabajo ...
git checkout master
git merge hotfix/nombre-descriptivo --no-ff
git push origin master
```

### Limpiar Ramas

Solo mantener activas: `master` y `develop`

---

## 🎯 Convenciones Específicas

### Naming de Tests

```typescript
// Playwright
test('descripción del test', async ({ page }) => {
  // ...
});

// Cucumber
Scenario: Descripción del escenario
```

### Selectores

**Prioridad:**
1. `data-testid` (preferido)
2. `role` + name (accesibilidad)
3. `label` (formularios)
4. CSS selector (último recurso)

### Comentarios en Tests Skipped

```typescript
// DESHABILITADO: Usuario caducará pronto, tests de customer desactivados
test.skip('test name', async ({ page }) => {
  // ...
});
```

---

## 📝 Archivos de Documentación

- `README.md` - Setup e instalación
- `WORKFLOWS.md` - CI/CD y workflows (actualizado 2026-02-09)
- `BDD_README.md` - Tests Cucumber
- `MIGRACION_BDD.md` - Migración a BDD
- `tests/ppia/README.md` - Documentación PPIA
- `MEMORY.md` - Skills activos (auto-gestionado)

---

## ⚠️ Importante para Claude Code

### Al Ejecutar Tests

**SIEMPRE preguntar antes de ejecutar tests:**
- El usuario puede estar ejecutando tests en otros proyectos
- Workers de Playwright pueden estar ocupados
- Esperar permiso explícito del usuario

### Al Modificar Tests de Customer

**NO reactivar tests de customer** sin consultar al usuario:
- Están skipped por una razón (usuario caducará)
- Mantener `.skip()` hasta nueva indicación

### Al Trabajar con PPIA

**PPIA está en desarrollo activo (v0.1.0):**
- Los tests generados son funcionales pero pueden necesitar ajustes
- Las estrategias están en evolución
- Documentar cambios en `tests/ppia/README.md`

---

## 🔧 Troubleshooting

### Tests no detectados en IDE

```bash
nvm use 20
nvm alias default 20
npm ci
npx playwright install --with-deps
# Reiniciar IDE
```

### Error con Playwright

```bash
# Reinstalar desde cero
rm -rf node_modules package-lock.json
npm ci
npx playwright install --with-deps
```

### Cucumber no encuentra steps

```bash
# Verificar paths en cucumber.config.js
# Asegurar que register.js existe
```

---

## 📊 Estado del Proyecto

**Última actualización:** 2026-02-09

**Ramas activas:**
- ✅ master
- ✅ develop

**Tests totales:**
- ✅ ~40 tests activos
- ⚠️ ~21 tests skipped (customer)

**CI/CD:**
- ✅ Configurado
- ❌ Cron deshabilitado
- ✅ Ejecución manual disponible

**PPIA:**
- ✅ v0.1.0 operativa
- 🚧 En desarrollo continuo

---

*Este archivo es específico del proyecto y se complementa con ~/.claude/CLAUDE.md*
*Última actualización: 2026-02-09*
