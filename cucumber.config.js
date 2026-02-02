module.exports = {
  default: [
    'features/**/*.feature',
    '--require ./register.js',
    '--format progress'
  ].join(' ')
};
