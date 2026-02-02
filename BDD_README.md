# 🥒 BDD Testing con Cucumber + Playwright

Este proyecto ahora incluye soporte completo para **Behavior-Driven Development (BDD)** usando **Cucumber** con **Playwright**.

## 🚀 Comandos Disponibles

### Ejecutar Tests BDD

```bash
# Ejecutar todos los tests BDD
npm run test:bdd

# Ejecutar solo tests marcados como @smoke
npm run test:bdd:smoke

# Ejecutar solo tests de @regression
npm run test:bdd:regression

# Ejecutar tests con tags específicos
npm run test:bdd:tags "@home and not @slow"

# Ejecutar en paralelo (2 workers)
npm run test:bdd:parallel

# Generar reporte HTML después de ejecutar
npm run test:generate-report
```
