import { test } from '@playwright/test';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// DESHABILITADO: Usuario caducará pronto, tests de customer desactivados
test.describe.skip('Cucumber BDD - Todas las Features', () => {
  test('Ejecutar todas las features Cucumber (HOME + LOGIN + CUSTOMER)', async () => {
    try {
      // Ejecutar el comando completo de Cucumber
      const { stdout, stderr } = await execAsync(
        'npx cucumber-js features/ --require ./register.js --require step-definitions/customer/customer-bdd.ts --require step-definitions/home/home.steps.ts --require step-definitions/login/login.steps.ts --require support/hooks-bdd.ts',
        { timeout: 120000 } // 2 minutos timeout
      );

      console.log('✅ Cucumber BDD - Output:');
      console.log(stdout);

      if (stderr) {
        console.warn('⚠️ Cucumber Warnings:', stderr);
      }

      // Verificar que no hubo fallos
      if (stdout.includes('failed') || stdout.includes('undefined')) {
        throw new Error(`Cucumber tests fallaron: ${stdout}`);
      }

      // Verificar que se ejecutaron los 26 scenarios esperados
      if (!stdout.includes('26 scenarios') || !stdout.includes('passed')) {
        throw new Error(`No se ejecutaron todos los scenarios esperados: ${stdout}`);
      }

      console.log('✅ Todos los tests BDD pasaron exitosamente');

    } catch (error) {
      throw new Error(`Cucumber BDD falló`);
    }
  });
});
