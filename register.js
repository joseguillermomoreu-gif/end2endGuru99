// Configuración personalizada de ts-node para Cucumber con path aliases
try {
  require('ts-node').register({
    project: './tsconfig.json',
    transpileOnly: true,
    compilerOptions: {
      target: 'ES2020',
      module: 'commonjs',
      moduleResolution: 'node',
      esModuleInterop: true,
      allowSyntheticDefaultImports: true
    }
  });

  // Resolver path aliases usando tsconfig-paths
  const tsConfigPaths = require('tsconfig-paths');
  tsConfigPaths.register({
    baseUrl: './',
    paths: {
      '@components/*': ['./components/*'],
      '@support/*': ['./support/*'],
      '@helpers/*': ['./helpers/*']
    }
  });

} catch (error) {
  console.error('❌ Error configurando ts-node:', error);
  throw error;
}
