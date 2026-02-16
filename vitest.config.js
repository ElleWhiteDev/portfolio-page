import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        '*.config.js',
        'js/custom.js' // Legacy file
      ]
    },
    include: ['tests/**/*.test.js'],
    setupFiles: ['./tests/setup.js']
  }
});

