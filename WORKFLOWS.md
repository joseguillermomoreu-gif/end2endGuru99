# 🔧 Workflows CI/CD - Tests E2E Nocturnos

## 📋 Configuración Automática

Los workflows están configurados para ejecutarse automáticamente cada noche a las **03:00 UTC** (04:00 hora española).

## 🚀 GitHub Actions

### Configuración Automática:
```yaml
# Se ejecuta automáticamente:
- Diariamente a las 03:00 UTC
- En push a main/master
- Manualmente desde GitHub UI
```

### Ejecución Manual:
1. Ir a **Actions** en GitHub
2. Seleccionar **🌙 Nightly E2E Tests** 
3. Click **Run workflow**
4. Elegir opciones:
   - **Test Suite**: `all` | `customer-only` | `ppia-only`
   - **Browser**: `chrome` | `firefox` | `both`

### Comandos Locales Equivalentes:
```bash
# Customer tests
npx playwright test --project="Setup Authentication"
npx playwright test --project="Login Tests Admin - Chrome"

# PPIA tests
npx playwright test --project="Test PPIA - Chrome"
```

## 🦊 GitLab CI/CD

### Configuración del Schedule:
1. Ir a **Settings > CI/CD > Schedules**
2. Click **New Schedule**
3. Configurar:
   - **Description**: `Tests E2E Nocturnos 03:00h`
   - **Interval Pattern**: `0 3 * * *`
   - **Cron Timezone**: `Europe/Madrid`
   - **Target Branch**: `main`

### Variables Opcionales:
```yaml
BROWSER: "both"      # chrome | firefox | both
TEST_SUITE: "all"    # all | customer | ppia
```

### Ejecución Manual:
1. Ir a **CI/CD > Pipelines**
2. Click **Run Pipeline**
3. Agregar variables si necesario

## 📊 Resultados y Reportes

### Artifacts Generados:
- **test-results/**: Resultados detallados XML/JSON
- **playwright-report/**: Reporte HTML interactivo
- **screenshots/videos**: Capturas y grabaciones de fallos

### Retención:
- **Resultados diarios**: 7 días
- **Reportes consolidados**: 30 días
- **Estados de auth**: 1 día

## 🎯 Suites de Tests

### 🔑 Customer Tests (Login Required)
```bash
# 21 tests dinámicos:
- 2 tests creación válida (male/female)
- 1 test campos requeridos
- 16 tests validaciones (formato + longitud)
- 1 test reset formulario
- 1 test navegación
```

### 🤖 PPIA Tests (Generated)
```bash
# Tests generados automáticamente:
- Login exitoso
- Creación customer válido
- Validaciones campos obligatorios
- Validaciones formato incorrecto
- Validaciones longitud mínima
```

## 🔔 Notificaciones

### GitHub:
- Resultados visibles en **Actions**
- Emails automáticos en fallos (si configurado)

### GitLab:
- Resultados en **CI/CD > Pipelines**
- Integración Slack/Teams disponible

## ⚙️ Personalización

### Cambiar Horario:
```yaml
# GitHub (.github/workflows/nightly-tests.yml)
schedule:
  - cron: '0 2 * * *'  # 02:00 UTC

# GitLab (UI Schedule)
Interval Pattern: "0 2 * * *"  # 02:00 UTC
```

### Añadir Navegadores:
```yaml
# En matrix strategy:
browser: ['chrome', 'firefox', 'safari']
```

### Variables de Entorno:
```bash
# Personalizar en workflows:
baseUrl: "https://testing.guru99.com"  # Entorno diferente
testUser: "otroUsuario"
testPass: "otraPassword"
```

---
*Configuración completa para CI/CD automatizado - Enero 2026*
