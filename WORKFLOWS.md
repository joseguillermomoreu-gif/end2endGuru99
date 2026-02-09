# 🔧 Workflows CI/CD - Tests E2E Simplificados

## 📋 Configuración Automática

⚠️ **ACTUALIZACIÓN 2026-02-09**: El cron nocturno ha sido **DESHABILITADO** permanentemente.

**Razón:** El usuario de pruebas (mngr652417) caducará pronto. Los tests de customer han sido marcados como `.skip()` para evitar fallos.

**Ejecución actual:**
- ✅ Manual (workflow_dispatch)
- ✅ Push a master
- ❌ ~~Automática nocturna~~ (DESHABILITADA)

## 🌳 Flujo de Branches

### Estructura:
```
develop  ← Desarrollo activo (NO ejecuta pipelines)
  ↓ merge
master   ← Pipeline CI/CD activado aquí
```

### Para Activar Tests Nocturnos:
```bash
git checkout master
git merge develop  
git push origin master  # ← Pipelines activados
```

## 🚀 GitHub Actions

### Configuración Actual:
- ❌ ~~Diariamente a las 03:00 UTC~~ **(DESHABILITADO 2026-02-09)**
- 🔄 **En push/merge a master**
- 🎛️ **Manualmente** desde GitHub UI

### Fases de Tests:
1. **🔑 QA Tests** - Setup auth + Login tests (~5 tests activos)
   - ⚠️ Customer tests (16 tests) marcados como `.skip()`
2. **🤖 PPIA Tests** - Tests generados automáticamente
   - ⚠️ Customer PPIA tests (15 archivos) marcados como `.skip()`

### Ejecución Manual:
1. Ir a **Actions** en GitHub
2. Seleccionar **🌙 Nightly E2E Tests** 
3. Click **Run workflow**
4. Elegir branch: `master`
5. Elegir opciones:
   - **Test Suite**: `both` | `qa-only` | `ppia-only`
   - **Browser**: `chrome` | `firefox` | `both`

## 🦊 GitLab CI/CD

### Configurar Schedule (Una Sola Vez):
1. Ir a **Settings > CI/CD > Schedules**
2. Click **New Schedule**
3. Configurar:
   - **Description**: `Tests E2E Nocturnos 03:00h`
   - **Interval Pattern**: `0 3 * * *`
   - **Cron Timezone**: `Europe/Madrid`
   - **Target Branch**: `master` ⚠️ **IMPORTANTE**

### Fases de Tests:
1. **Stage qa-tests** - QA Tests con autenticación
2. **Stage ppia-tests** - Tests PPIA sin autenticación

### Variables del Schedule (Opcional):
```yaml
BROWSER: "both"      # chrome | firefox | both  
```

### Ejecución Manual:
1. Ir a **CI/CD > Pipelines**
2. Click **Run Pipeline**
3. **Seleccionar branch**: `master` ⚠️
4. Agregar variables si necesario

## 📊 Resultados

### Ver Estado:
- **✅ Verde**: Todos los tests pasaron
- **❌ Rojo**: Algún test falló

### Ver Detalles:
- **GitHub**: **Actions** > **Workflow** > **Job** > Ver logs específicos
- **GitLab**: **Pipelines** > **Pipeline** > **Job** > Ver logs específicos

### Jobs Independientes:
Cada job es completamente independiente:
- **QA Tests**: Hace su propio setup + ejecuta customer tests
- **PPIA Tests**: Va directo a tests sin dependencias

## ⚙️ Personalización

### Reactivar Cron (si fuera necesario):
```yaml
# GitHub: .github/workflows/nightly-tests.yml
# Descomentar líneas 7-8:
schedule:
  - cron: '0 2 * * *'  # 02:00 UTC

# GitLab: Schedules UI
Interval Pattern: "0 2 * * *"
```

⚠️ **Nota:** No reactivar hasta que se resuelva el tema del usuario de pruebas.

### Cambiar Variables:
```bash
# En workflows:
baseUrl: "https://testing.guru99.com"
testUser: "otroUsuario" 
testPass: "otraPassword"
```

## 🚀 Quick Setup

### Primera Configuración:
```bash
# 1. Hacer merge a master para activar
git checkout master
git merge develop
git push origin master

# 2. (GitLab) Configurar Schedule en UI
Settings > CI/CD > Schedules > New Schedule

# 3. Ver primera ejecución
# GitHub: Actions
# GitLab: CI/CD > Pipelines
```

### Tests Locales:
```bash
# QA Tests:
npx playwright test --project="Setup Authentication"
npx playwright test --project="Login Tests Admin - Chrome"

# PPIA Tests:
npx playwright test --project="Test PPIA - Chrome"
```

---
*Pipeline máximo simplificado - Solo verde/rojo - Enero 2026*
