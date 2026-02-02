const reporter = require('cucumber-html-reporter');
const fs = require('fs');
const path = require('path');

// Configuración del reporte HTML
const options = {
  theme: 'bootstrap',
  jsonFile: 'reports/cucumber-report.json',
  output: 'reports/cucumber-report.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: false,
  metadata: {
    'App Version': '1.0.0',
    'Test Environment': process.env.NODE_ENV || 'local',
    'Browser': process.env.BROWSER || 'chromium',
    'Platform': process.platform,
    'Executed': new Date().toISOString(),
    'Project': 'Guru99 Bank E2E Testing'
  },
  failedSummaryReport: true,
  brandTitle: 'Guru99 Bank - BDD Test Report',
  name: 'E2E Testing Results'
};

// Verificar que existe el archivo JSON
if (!fs.existsSync(options.jsonFile)) {
  console.error(`❌ No se encontró el archivo JSON: ${options.jsonFile}`);
  console.log('💡 Asegúrate de ejecutar primero: npm run test:bdd');
  process.exit(1);
}

// Crear directorio de reportes si no existe
const reportsDir = path.dirname(options.output);
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

// Generar el reporte
console.log('📊 Generando reporte HTML de Cucumber...');
console.log(`📁 Leyendo: ${options.jsonFile}`);
console.log(`💾 Generando: ${options.output}`);

try {
  reporter.generate(options);
  console.log('✅ Reporte HTML generado exitosamente');
  console.log(`🔗 Abre el reporte: file://${path.resolve(options.output)}`);

  // Mostrar estadísticas básicas
  const jsonData = JSON.parse(fs.readFileSync(options.jsonFile, 'utf8'));

  if (Array.isArray(jsonData) && jsonData.length > 0) {
    let totalScenarios = 0;
    let passedScenarios = 0;
    let failedScenarios = 0;

    jsonData.forEach(feature => {
      if (feature.elements) {
        feature.elements.forEach(scenario => {
          if (scenario.type === 'scenario') {
            totalScenarios++;
            const failed = scenario.steps.some(step =>
              step.result && step.result.status === 'failed'
            );
            if (failed) {
              failedScenarios++;
            } else {
              passedScenarios++;
            }
          }
        });
      }
    });

    console.log('\n📈 Estadísticas del Test:');
    console.log(`   Total Scenarios: ${totalScenarios}`);
    console.log(`   ✅ Passed: ${passedScenarios}`);
    console.log(`   ❌ Failed: ${failedScenarios}`);
    console.log(`   📊 Success Rate: ${totalScenarios > 0 ? ((passedScenarios / totalScenarios) * 100).toFixed(1) : 0}%`);
  }

} catch (error) {
  console.error('❌ Error generando el reporte:', error.message);
  process.exit(1);
}
