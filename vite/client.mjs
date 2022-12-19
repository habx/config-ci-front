import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { cwd, env } from 'node:process'
import { defineConfig, loadEnv } from 'vite'

import browserslist from '../browserslist.js'

export default defineConfig(async (params) => {
  const viteEnv = loadEnv(params.mode, process.cwd(), '')

  const define = {
    'import.meta.env.VERSION_BUILD_INFOS': JSON.stringify(viteEnv.VERSION_BUILD_INFOS),
    'process.env.NODE_ENV': `'${params.mode}'`,
    // Hack to make libraries using `process.env` work with Vitejs
    'process.env': JSON.stringify({}), 
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

  const plugins = []

  try {
    plugins.push((await import('@vitejs/plugin-react-swc')).default())
  } catch {
    plugins.push((await import('@vitejs/plugin-react')).default())
  }

  let sourcemap = false

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
      sourcemap = viteEnv.SKIP_SOURCE_MAP !== 'true'

      if (viteEnv.DISABLE_LEGACY_PLUGIN !== 'true') {
        try {
          plugins.push((await import('@vitejs/plugin-legacy')).default({
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
    plugins.push((await import('rollup-plugin-visualizer')).visualizer({ 
      filename: 'build/stats.html', 
      open: true, 
    }))
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
