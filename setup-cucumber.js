// setup-cucumber.js
require('ts-node/register');

// Configuración adicional para ts-node si es necesario
require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'es2018',
    esModuleInterop: true,
    allowSyntheticDefaultImports: true
  }
});
