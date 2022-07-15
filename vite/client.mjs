import { resolve } from 'path'
import { cwd, env } from 'process'
import { defineConfig } from 'vite'
import { readFileSync } from 'fs'
import { loadEnv } from 'vite'

import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'

import browserslist from '../browserslist.js'


export default defineConfig(async (params) => {
  const define = {
    'process.env.NODE_ENV': `'${params.mode}'`,
  }
  const viteEnv = loadEnv(params.mode, process.cwd(), '')

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


  if (viteEnv.CHECKER_ENABLED === 'true') {
    const { default: checker } = await import('vite-plugin-checker')

    plugins.push(
      checker.default({
        typescript: true,
        eslint: {
          files: ['./src'],
          extensions: ['.ts', '.tsx'],
        },
        overlay: viteEnv.CHECKER_OVERLAY !== 'false',
        enableBuild: false
      })
    )
  }

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

  if (viteEnv.ANALYZE) {
    const { visualizer } = await import('rollup-plugin-visualizer')
    plugins.push(visualizer({ open: true, filename: 'build/stats.html' }))
  }

  return {
    base: env.PUBLIC_URL,
    build: {
      outDir: 'build',
      rollupOptions: {
        output: {
          manualChunks: {
            lodash: ['lodash'],
          }
        }
      },
      sourcemap: params.mode === 'production',
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
