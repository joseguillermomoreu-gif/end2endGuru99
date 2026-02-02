import { World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium, firefox, webkit } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export interface CustomWorldOptions extends IWorldOptions {
  parameters: {
    baseUrl?: string;
    headless?: boolean;
    browser?: string;
  };
}

export class CustomWorld extends World {
  public browser!: Browser;
  public context!: BrowserContext;
  public page!: Page;
  public baseUrl: string;

  constructor(options: CustomWorldOptions) {
    super(options);

    // Configuración desde parámetros o variables de entorno
    this.baseUrl = options.parameters?.baseUrl ||
                   process.env.BASE_URL ||
                   `${process.env.baseUrl}${process.env.domain}/${process.env.version}/index.php` ||
                   'https://demo.guru99.com/V4/index.php';
  }

  // eslint-disable-next-line max-lines-per-function
  async initBrowser(browserName: string = 'chromium') {
    const headless = process.env.HEADLESS !== 'false';

    switch (browserName.toLowerCase()) {
      case 'firefox':
        this.browser = await firefox.launch({ headless });
        break;
      case 'webkit':
        this.browser = await webkit.launch({ headless });
        break;
      case 'chromium':
      default:
        this.browser = await chromium.launch({ headless });
        break;
    }

    // Crear contexto con configuración específica
    this.context = await this.browser.newContext({
      viewport: { width: 1280, height: 720 },
      ignoreHTTPSErrors: true,
      acceptDownloads: true,
    });

    // Crear página
    this.page = await this.context.newPage();

    // Configuraciones adicionales de página
    this.page.setDefaultTimeout(30000);
    this.page.setDefaultNavigationTimeout(30000);
  }

  // Cerrar browser y limpiar recursos
  async closeBrowser() {
    if (this.page) {
      await this.page.close();
    }
    if (this.context) {
      await this.context.close();
    }
    if (this.browser) {
      await this.browser.close();
    }
  }

  // Helper para screenshots en caso de error
  async takeScreenshot(filename: string) {
    if (this.page) {
      const screenshot = await this.page.screenshot({
        path: `test-results/screenshots/${filename}.png`,
        fullPage: true
      });

      // Adjuntar screenshot al reporte de Cucumber
      this.attach(screenshot, 'image/png');
    }
  }

  // Helper para logs de debug
  async logPageInfo() {
    if (this.page) {
      const url = this.page.url();
      const title = await this.page.title();

      this.attach(`
        Current URL: ${url}
        Page Title: ${title}
        Timestamp: ${new Date().toISOString()}
      `, 'text/plain');
    }
  }
}

// Exportar para que Cucumber lo use
export { CustomWorld as World };
