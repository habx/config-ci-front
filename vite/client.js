const path = require('path')

const vite = require('vite')
const legacy = require('@vitejs/plugin-legacy')
const react = require('@vitejs/plugin-react')

const browserslist = require('../browserslist')

module.exports = vite.defineConfig((params) => {
  var define = {
    'process.env.NODE_ENV': `'${params.mode}'`,
  }

  var dedupe = [
    '@apollo/client',
    'final-form',
    'react',
    'react-dom',
    'react-router-dom',
    'react-final-form',
    'react-final-form-arrays',
    'react-intl',
    'react-table',
    'styled-components',
  ]

  var plugins = [
    react(),
  ]

  switch (params.mode) {
    case 'development':
      define['window.HABX_ENV'] = "'local'"
      define['window.HABX_VERSION'] = "'local'"

      try {
        JSON.parse(readFileSync(('./linked-deps.json'))).forEach(dependency =>
          dedupe.push(dependency))
      } catch {}

      break

    case 'production':
      plugins.push(legacy({
        ignoreBrowserslistConfig: true,
        targets: browserslist.production,
      }))

      break
  }

  return {
    base: process.env.PUBLIC_URL,
    build: {
      outDir: 'build',
      terserOptions: {
        keep_fnames: /Float32Array/, // Fix for GLTF DRACOLoader on older Safari versions
      },
    },
    define,
    plugins,
    resolve: {
      alias: {
        '@' : path.resolve(__dirname, './src'),
        'querystring': 'qs',
        'polygon-clipping': 'polygon-clipping/dist/polygon-clipping.cjs.js',
      },
      dedupe,
    },
  }
})
