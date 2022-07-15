/** @type {import('bili').Config} */
exports.config = {
  plugins: {
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
