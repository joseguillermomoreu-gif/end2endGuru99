# PPIA - Tests E2E Automatizados Guru99 Bank

## ¿Qué es PPIA?

PPIA es un Agente de IA desarrollado y diseñado por mi para la **generación automática de tests End-to-End**.
Analiza páginas web y genera código Playwright funcional basado en objetivos específicos aportados en un texto.

**Versión utilizada:** `0.1.0` - *En continua evolución*

### Características:
- **Análisis automático de HTML** - Inspecciona estructura de la página
- **Generación de selectores** - Identifica elementos interactuables automáticamente
- **Múltiples estrategias de análisis** - 3 enfoques diferentes por test
- **Tests funcionales** - Genera código Playwright ejecutable

> **Nota:** Las estrategias son las distintas formas de análisis que tiene el agente para generar los tests. La versión 0.1.0 aún está en desarrollo y le faltan estrategias adicionales.

## Tests Generados por Objetivo

### 📁 `/testsPPIA-4-acceso/`
**Objetivo PPIA:** *"Validar que el usuario puede iniciar sesión correctamente con User ID=mngr652417 y Password=UhEpYne y acceder al dashboard mostrando el Manager ID"*

### 📁 `/testsPPIA-4-crear/`  
**Objetivo PPIA:** *"Validar que el usuario puede iniciar sesión correctamente con User ID=mngr652417 y Password=UhEpYne luego acceder a la sección 'New Customer' y crear un nuevo cliente rellenando todos los campos con datos válidos y verificar que aparece la tabla de confirmación"*

### 📁 `/testsPPIA-4-required/`
**Objetivo PPIA:** *"Validar que el usuario puede iniciar sesión correctamente con User ID=mngr652417 y Password=UhEpYne luego acceder a la sección 'New Customer' e intentar enviar el formulario sin rellenar ningún campo y verificar que aparece un alert indicando campos obligatorios"*

### 📁 `/testsPPIA-4-invalid/`
**Objetivo PPIA:** *"Validar que el usuario puede iniciar sesión correctamente con User ID=mngr652417 y Password=UhEpYne luego acceder a la sección 'New Customer' e intentar crear un nuevo cliente rellenando los campos con caracteres especiales y valores incorrectos ignorando el campo de género y fechas y verificar que aparece un alert al hacer submit erróneo"*

### 📁 `/testsPPIA-4-minchar/`
**Objetivo PPIA:** *"Validar que el usuario puede iniciar sesión correctamente con User ID mngr652417 y Password UhEpYne luego acceder a la sección New Customer intentar crear un cliente ingresando solo dos caracteres numéricos en los campos requeridos ignorando el campo de género y usando la fecha 17 de marzo de 1992 y verificar que aparece un alert de error al enviar el formulario"*

## Metodología de Generación

### Estrategias de Análisis (v0.1.0):
1. **Strategy 1** - Análisis completo de HTML con IA
2. **Strategy 2** - Análisis con preguntas binarias dirigidas  
3. **Strategy 3** - Enfoque híbrido con validaciones específicas

### Proceso Automático:
- **Análisis iterativo** - 5-17 iteraciones por test
- **Consumo tokens** - 1,500-5,300 tokens OpenAI por test
- **Tiempo generación** - 40-330 segundos por test
- **Output** - Código Playwright puro y funcional

## Estado de Desarrollo

**PPIA v0.1.0** está en **continua evolución**. Esta versión inicial incluye:

✅ **Disponible:**
- 3 estrategias de análisis básicas
- Generación automática de selectores
- Manejo de formularios y alerts
- Validaciones de campos
- Comparacion y ejecucion de tests autogenerados

🚧 **En desarrollo (próximas versiones):**
- Finalizacion de migraicion del resto de Estrategias
- Soporte para elementos complejos (drag&drop, modals, hover)
- Optimización de tokens consumidos
- Generación de datasets automática

## Ejecución

```bash
# Tests PPIA por navegador:
npx playwright test --project="Test PPIA - Chrome"
npx playwright test --project="Test PPIA - Firefox"

# Test individual:
npx playwright test tests/ppia/testsPPIA-4-crear/test-strategy1-crear-customer-guru99-bank-e2e-20260124-212914.generated.spec.ts
```

---
*Tests generados automáticamente por PPIA v0.1.0 - Enero 2026*
