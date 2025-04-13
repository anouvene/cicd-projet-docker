import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfigFn from './vite.config'

export default (async () => {
  const viteConfig = await viteConfigFn({
    command: 'build',
    mode: 'test'
  })

  return mergeConfig(
    viteConfig,
    defineConfig({
      test: {
        environment: 'jsdom',
        include: ['src/**/*.test.ts'],
        exclude: [...configDefaults.exclude, 'e2e/*'],
        root: fileURLToPath(new URL('./', import.meta.url)),
        coverage: {
          reporter: ['text', 'lcov'],
          provider: 'v8'
        }
      }
    })
  )
})()