# 🔧 Workflows CI/CD - Tests E2E Nocturnos

## 📋 Configuración Automática

Los workflows están configurados para ejecutarse automáticamente cada noche a las **03:00 UTC** (04:00 hora española) **SOLO en la rama master**.

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

### Configuración Automática:
- ⏰ **Diariamente a las 03:00 UTC** desde `master`
- 🔄 **En push/merge a master**
- 🎛️ **Manualmente** desde GitHub UI

### Ejecución Manual:
1. Ir a **Actions** en GitHub
2. Seleccionar **🌙 Nightly E2E Tests** 
3. Click **Run workflow**
4. Elegir branch: `master`
5. Elegir opciones:
   - **Test Suite**: `all` | `customer-only` | `ppia-only`
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

### Variables del Schedule (Opcional):
```yaml
BROWSER: "both"      # chrome | firefox | both  
TEST_SUITE: "all"    # all | customer | ppia
```

### Ejecución Manual:
1. Ir a **CI/CD > Pipelines**
2. Click **Run Pipeline**
3. **Seleccionar branch**: `master` ⚠️
4. Agregar variables si necesario

## 📊 Resultados

### Ver Resultados:
- **GitHub**: **Actions** > **Workflow ejecutado** > Ver logs de cada job
- **GitLab**: **CI/CD** > **Pipelines** > **Pipeline ejecutado** > Detalles por job

### Logs Disponibles:
- ✅ **Passing tests**: Verde con detalles
- ❌ **Failing tests**: Rojo con errores específicos
- ⚠️ **Setup issues**: Problemas de autenticación

## 🔔 Notificaciones

### GitHub:
- Estado visible en **Actions**
- Emails en fallos (si configurado en repo settings)

### GitLab:
- Estado visible en **CI/CD > Pipelines**
- Notificaciones Slack/Teams (si configurado)

## ⚙️ Personalización

### Cambiar Horario:
```yaml
# GitHub: .github/workflows/nightly-tests.yml
schedule:
  - cron: '0 2 * * *'  # 02:00 UTC

# GitLab: Schedules UI
Interval Pattern: "0 2 * * *"
```

### Cambiar Branch:
```yaml
# Si quisieras ejecutar desde develop:
push:
  branches: [ develop ]  # En lugar de master
```

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

# 3. Verificar primera ejecución
# GitHub: Actions
# GitLab: CI/CD > Pipelines
```

### Tests Locales (Opcional):
```bash
# Para probar antes del merge:
npm ci
npx playwright install --with-deps
npx playwright test --project="Setup Authentication"
npx playwright test --project="Login Tests Admin - Chrome"
```

---
*Pipeline simplificado develop → master - Enero 2026*
