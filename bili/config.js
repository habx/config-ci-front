const helpers = require('../helpers')

/** @type {import('bili').Config} */
exports.config = {
  plugins: {
    analyzer: helpers.exists(
      'rollup-plugin-analyzer',
      'install the package to enable bundle size analysis.'
    ),
    babel: false,
    typescript2: {
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        outDir: 'dist/esm',
        declaration: false,
      },
    },
  },
  input: 'src/index.ts',
  output: {
    fileName: '[name].[format].js',
    format: 'cjs',
  },
}
