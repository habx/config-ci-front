import { resolve } from 'path'
import { cwd, env } from 'process'
import { defineConfig } from 'vite'
import { readFileSync } from 'fs'
import { loadEnv } from 'vite'

import react from '@vitejs/plugin-react'

import browserslist from '../browserslist.js'


export default defineConfig(async (params) => {
  const viteEnv = loadEnv(params.mode, process.cwd(), '')

  const define = {
    'process.env.NODE_ENV': `'${params.mode}'`,
    'process.env': JSON.stringify({}), // hack to make libraries using process.env work with vitejs
    'import.meta.env.VERSION_BUILD_INFOS': JSON.stringify(viteEnv.VERSION_BUILD_INFOS),
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
    'three',
  ]

  const plugins = [
    react(),
  ]

  let sourcemap = viteEnv.SKIP_SOURCE_MAP === 'true' ? false : params.mode === 'production'

  switch (params.mode) {
    case 'development':
      define['window.HABX_ENV'] = "'local'"
      define['window.VERSION'] = "'local'"

      try {
        JSON.parse(readFileSync(resolve(cwd(), 'linked-deps.json'))).forEach(dependency =>
          dedupe.push(dependency))
      } catch {}

      if (viteEnv.CHECKER_ENABLED === 'true') {
        const { default: checker } = await import('vite-plugin-checker')

        plugins.push(
          checker.default({
            enableBuild: false,
            eslint: {
              files: ['./src'],
              extensions: ['.ts', '.tsx'],
            },
            overlay: viteEnv.CHECKER_OVERLAY !== 'false',
            typescript: true,
          })
        )
      }

      break

    case 'production':
      if (viteEnv.DISABLE_LEGACY_PLUGIN !== 'true') {
        try {
          const { default: legacy } = await import('@vitejs/plugin-legacy')
          plugins.push(legacy({
            ignoreBrowserslistConfig: true,
            targets: browserslist.production,
          }))
        } catch {
          // Silent catch
        }
      }

      break
  }

  if (viteEnv.ANALYZE === 'true') {
    const { visualizer } = await import('rollup-plugin-visualizer')

    plugins.push(visualizer({ filename: 'build/stats.html', open: true }))
  }

  return {
    base: env.PUBLIC_URL,
    build: {
      cssCodeSplit: false,
      outDir: 'build',
      reportCompressedSize: false,
      sourcemap,
      terserOptions: {
        keep_fnames: /Float32Array/, // Fix for GLTF DRACOLoader on older Safari versions
      },
    },
    define,
    plugins,
    resolve: {
      alias: {
        '@' : resolve(cwd(), 'src'),
        'lodash': 'lodash-es',
        'polygon-clipping': 'polygon-clipping/dist/polygon-clipping.cjs.js',
        'querystring': 'qs',
      },
      dedupe,
    },
  }
})
