import itoConfigFactory from './src/index.js';

export default itoConfigFactory({
  framework: 'react',
  tailwind: true,
  checkFile: { enabled: true, ignores: [] },
});
