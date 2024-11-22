import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

// https://vite.dev/config/
export default defineConfig({
  css: { postcss: { plugins: [tailwindcss()] } },
  plugins: [react()],
  test: {
    globals: true, // Enables global methods like `describe`, `it`, and `expect`
    environment: 'jsdom', // Simulates the browser environment
    setupFiles: './src/test/setup.ts',
    include: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'], // Optional: Setup file for global test configs
  },
})
