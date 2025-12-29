import { defineConfig } from 'vitest/config'

export default defineConfig({
  server: {
    deps: {
      inline: ['src/**']
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
  }
})
