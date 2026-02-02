import { Before, After, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
import { CustomWorld } from './world';
import * as fs from 'fs';

BeforeAll(async function () {
  const screenshotDir = 'test-results/screenshots';
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }
  const reportsDir = 'reports';
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
});

AfterAll(async function () {
  console.log('✅ Suite de tests BDD completada');
});

// eslint-disable-next-line max-lines-per-function
Before(async function (this: CustomWorld, scenario) {
  console.log(`\n🎬 Iniciando scenario: ${scenario.pickle.name}`);

  // Obtener browser desde tags si está especificado
  const browserTag = scenario.pickle.tags.find(tag =>
    tag.name.includes('browser:')
  );

  let browserName = 'chromium';
  if (browserTag) {
    browserName = browserTag.name.replace('@browser:', '');
  }

  // Inicializar browser para este scenario
  await this.initBrowser(browserName);

  // Log información del scenario
  this.attach(`
    Scenario: ${scenario.pickle.name}
    Feature: ${scenario.gherkinDocument.feature?.name}
    Browser: ${browserName}
    Tags: ${scenario.pickle.tags.map(tag => tag.name).join(', ')}
    Started at: ${new Date().toISOString()}
  `, 'text/plain');
});

// Hook que se ejecuta después de cada scenario
After(async function (this: CustomWorld, scenario) {
  const scenarioName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, '_');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

  // Si el scenario falló, tomar screenshot
  if (scenario.result?.status === Status.FAILED) {
    console.log(`❌ Scenario falló: ${scenario.pickle.name}`);
    await this.takeScreenshot(`FAILED_${scenarioName}_${timestamp}`);
    await this.logPageInfo();
  } else if (scenario.result?.status === Status.PASSED) {
    console.log(`✅ Scenario exitoso: ${scenario.pickle.name}`);
  }

  // Limpiar recursos del browser
  await this.closeBrowser();

  console.log(`🏁 Scenario completado: ${scenario.pickle.name}`);
});

// Hook específico para scenarios con tag @slow
Before('@slow', async function (this: CustomWorld) {
  console.log('⏳ Iniciando test marcado como @slow - aumentando timeouts');
  if (this.page) {
    this.page.setDefaultTimeout(60000);
    this.page.setDefaultNavigationTimeout(60000);
  }
});

// Hook específico para scenarios críticos
Before('@critical', async function (this: CustomWorld) {
  console.log('🚨 Iniciando test crítico - configuración especial');
});

// Hook para cleanup de datos si fuera necesario
After('@cleanup', async function (this: CustomWorld) {
  console.log('🧹 Ejecutando cleanup post-test');
  if (this.context) {
    await this.context.clearCookies();
  }
});
