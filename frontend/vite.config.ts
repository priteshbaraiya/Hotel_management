/// <reference types="vitest" />
import { defineConfig } from 'vite';
import * as path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/test.ts',
    include: ['src/**/*.spec.ts'],
  },
  resolve: {
    alias: {
      'zone.js': 'zone.js/dist/zone.js',
    },
  },
});
