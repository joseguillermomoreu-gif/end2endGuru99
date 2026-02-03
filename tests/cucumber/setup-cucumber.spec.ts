import { test } from '@playwright/test';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

test.describe('Cucumber Setup Authentication', () => {
  test('Setup inicial para tests BDD', async () => {
    // Este test asegura que el entorno esté listo para Cucumber
    // Podría incluir verificaciones de configuración, credenciales, etc.

    try {
      // Verificar que las dependencias de Cucumber están disponibles
      await execAsync('npx cucumber-js --version');
      console.log('✅ Cucumber CLI disponible');

      // Verificar que los archivos de configuración existen
      const fs = require('fs');
      if (!fs.existsSync('./register.js')) {
        throw new Error('register.js no encontrado');
      }

      if (!fs.existsSync('./support/hooks-bdd.ts')) {
        throw new Error('hooks-bdd.ts no encontrado');
      }

      console.log('✅ Archivos de configuración Cucumber verificados');

    } catch (error) {
      throw new Error(`Setup Cucumber falló`);
    }
  });
});
