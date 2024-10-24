import { resolve } from 'node:path'

export default {
  root: './src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/index.html'),
      },
    },
  },
}
