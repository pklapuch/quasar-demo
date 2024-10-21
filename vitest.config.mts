import { defineConfig as defineViteConfig, mergeConfig } from 'vite';
import { defineConfig as defineVitestConfig } from 'vitest/config';

import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import tsconfigPaths from 'vite-tsconfig-paths';

const viteConfig = defineViteConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    quasar({
      sassVariables: 'src/quasar-variables.scss',
    }),
    tsconfigPaths(),
  ],
});

const vitestConfig = defineVitestConfig({
  test: {
    environment: 'happy-dom',
    setupFiles: 'test/vitest/setup-file.ts',
    include: [
      // Matches vitest tests in any subfolder of 'src' or into 'test/vitest/__tests__'
      // Matches all files with extension 'js', 'jsx', 'ts' and 'tsx'
      'src/**/*.vitest.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      'test/vitest/__tests__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
    ],
  },
});

export default mergeConfig(viteConfig, vitestConfig);
