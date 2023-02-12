// vite.config.ts
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

import { rollup, InputOptions, OutputOptions } from 'rollup'
import rollupPluginTypescript from 'rollup-plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'

const CompileTsServiceWorker = () => ({
  name: 'compile-typescript-service-worker',
  async writeBundle(_options, _outputBundle) {
    const inputOptions: InputOptions = {
      input: 'src/sw.ts',
      plugins: [rollupPluginTypescript(), nodeResolve()],
    }
    const outputOptions: OutputOptions = {
      file: 'dist/sw.js',
      format: 'es',
    }
    const bundle = await rollup(inputOptions)
    await bundle.write(outputOptions)
    await bundle.close()
  }
})


export default defineConfig({
  plugins: [

    CompileTsServiceWorker()
  ],
})
