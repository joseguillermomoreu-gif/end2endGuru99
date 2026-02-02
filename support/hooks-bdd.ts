import { Before, BeforeAll, After, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from '@playwright/test';
import * as dotenv from 'dotenv';

// Importar tus Page Objects existentes
import * as guru99 from '../components/guru99';
import * as login from '../components/guru99/login';
import * as home from '../components/guru99/home';

// Cargar variables de entorno
dotenv.config();

// Configurar timeout global
setDefaultTimeout(30000);

// Variables globales para reutilizar la sesión
let globalBrowser: Browser;
let globalContext: BrowserContext;
let globalPage: Page;

const env = process.env;
const TEST_USER = env.testUser || 'mngr652417';
const TEST_PASS = env.testPass || 'UhEpYne';

// HOOK GLOBAL: Setup inicial con login una sola vez
BeforeAll(async function () {
  // Crear browser y contexto
  globalBrowser = await chromium.launch({ headless: false });
  globalContext = await globalBrowser.newContext();
  globalPage = await globalContext.newPage();

  // Hacer login usando tus Page Objects existentes
  await guru99.gotoHome(globalPage);
  await login.fillUser(globalPage, TEST_USER);
  await login.fillPassword(globalPage, TEST_PASS);
  await login.clickLogin(globalPage);

  await home.checkWelcomeMessage(globalPage, TEST_USER);
});

// HOOK: Preparar page para cada scenario
Before(async function () {
  // Reutilizar la sesión global existente
  this.page = globalPage;
  this.context = globalContext;
  this.browser = globalBrowser;

  // Ir al homepage usando tu Page Object para asegurar estado limpio
  const currentUrl = globalPage.url();
  if (!currentUrl.includes('Managerhomepage.php')) {
    await home.gotoHome(globalPage);
  }
});

// HOOK: Limpiar después de cada scenario
After(async function (scenario) {
  if (scenario.result?.status === 'FAILED') {
    // Tomar screenshot en caso de fallo
    const screenshot = await globalPage.screenshot();
    this.attach(screenshot, 'image/png');
  }
});

// HOOK GLOBAL: Limpieza final
AfterAll(async function () {
  if (globalContext) {
    await globalContext.close();
  }
  if (globalBrowser) {
    await globalBrowser.close();
  }
});

// Exportar para uso en step definitions
export { globalPage, globalContext, globalBrowser };
