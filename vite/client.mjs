import { resolve } from 'path'
import { cwd, env } from 'process'
import { defineConfig } from 'vite'
import { readFileSync } from 'fs'

import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'

import browserslist from '../browserslist.js'

export default defineConfig((params) => {
  const define = {
    'process.env.NODE_ENV': `'${params.mode}'`,
  }

  const dedupe = [
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

  const plugins = [
    react(),
  ]

  switch (params.mode) {
    case 'development':
      define['window.HABX_ENV'] = "'local'"
      define['window.HABX_VERSION'] = "'local'"

      try {
        JSON.parse(readFileSync(resolve(cwd(), 'linked-deps.json'))).forEach(dependency =>
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
    base: env.PUBLIC_URL,
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
        '@' : resolve(cwd(), 'src'),
        'querystring': 'qs',
        'polygon-clipping': 'polygon-clipping/dist/polygon-clipping.cjs.js',
      },
      dedupe,
    },
  }
})
