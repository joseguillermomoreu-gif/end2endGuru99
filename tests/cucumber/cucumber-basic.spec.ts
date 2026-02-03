import { test } from '@playwright/test';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

test.describe('Cucumber BDD - Features Básicas (Home + Login)', () => {
  test('Ejecutar solo features de acceso y autenticación', async () => {
    try {
      // Ejecutar solo los tests básicos (home + login)
      const { stdout, stderr } = await execAsync(
        'npx cucumber-js features/home/ features/login/ --require ./register.js --require step-definitions/home/home.steps.ts --require step-definitions/login/login.steps.ts --require support/hooks-bdd.ts',
        { timeout: 60000 } // 1 minuto timeout
      );

      console.log('✅ Cucumber Basic Tests - Output:');
      console.log(stdout);

      if (stderr) {
        console.warn('⚠️ Basic Tests Warnings:', stderr);
      }

      // Verificar que no hubo fallos
      if (stdout.includes('failed') || stdout.includes('undefined')) {
        throw new Error(`Basic tests fallaron: ${stdout}`);
      }

      // Verificar que se ejecutaron los 6 scenarios básicos (3 home + 3 login)
      if (!stdout.includes('6 scenarios') || !stdout.includes('passed')) {
        throw new Error(`No se ejecutaron todos los basic scenarios: ${stdout}`);
      }

      console.log('✅ Todos los basic tests BDD pasaron exitosamente');

    } catch (error) {
      throw new Error(`Basic BDD tests fallaron`);
    }
  });
});
