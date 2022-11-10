// vite.config.ts
import { defineConfig } from 'vite';
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import typescript2 from 'rollup-plugin-typescript2';
import Components from 'unplugin-vue-components/vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
var resolvePath = (str) =>
  path.resolve('/Users/cpollman/Amplify/amplify-ui/packages/vue', str);
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Components({
      dirs: ['src/components/primitives'],
      exclude: [/node_modules/],
    }),
    typescript2({
      check: false,
      include: ['src/components/*.vue', 'src/components/primitives/*.vue'],
      tsconfigOverride: {
        compilerOptions: {
          sourceMap: true,
          declaration: true,
          declarationMap: true,
        },
        exclude: ['vite.config.ts', '__tests__'],
      },
    }),
  ],
  resolve: {
    alias: [
      {
        find: './runtimeConfig',
        replacement: './runtimeConfig.browser',
      },
    ],
  },
  build: {
    cssCodeSplit: false,
    lib: {
      entry: resolvePath('./src/index.ts'),
      formats: ['es', 'cjs'],
      name: 'ui-vue',
      fileName: (format) => (format === 'es' ? 'index.js' : `index.${format}`),
    },
    rollupOptions: {
      plugins: [dynamicImportVars],
      external: ['aws-amplify', 'vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
export { vite_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIHZpdGUuY29uZmlnLmpzXG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IGR5bmFtaWNJbXBvcnRWYXJzIGZyb20gJ0Byb2xsdXAvcGx1Z2luLWR5bmFtaWMtaW1wb3J0LXZhcnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XG5pbXBvcnQgdHlwZXNjcmlwdDIgZnJvbSAncm9sbHVwLXBsdWdpbi10eXBlc2NyaXB0Mic7XG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJztcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCc7XG5cbmNvbnN0IHJlc29sdmVQYXRoID0gKHN0cjogc3RyaW5nKSA9PiBwYXRoLnJlc29sdmUoXCIvVXNlcnMvY3BvbGxtYW4vQW1wbGlmeS9hbXBsaWZ5LXVpL3BhY2thZ2VzL3Z1ZVwiLCBzdHIpO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgdnVlKCksXG4gICAgdnVlSnN4KCksXG4gICAgQ29tcG9uZW50cyh7XG4gICAgICBkaXJzOiBbJ3NyYy9jb21wb25lbnRzL3ByaW1pdGl2ZXMnXSxcbiAgICAgIGV4Y2x1ZGU6IFsvbm9kZV9tb2R1bGVzL10sXG4gICAgfSksXG4gICAgdHlwZXNjcmlwdDIoe1xuICAgICAgY2hlY2s6IGZhbHNlLFxuICAgICAgaW5jbHVkZTogWydzcmMvY29tcG9uZW50cy8qLnZ1ZScsICdzcmMvY29tcG9uZW50cy9wcmltaXRpdmVzLyoudnVlJ10sXG4gICAgICB0c2NvbmZpZ092ZXJyaWRlOiB7XG4gICAgICAgIGNvbXBpbGVyT3B0aW9uczoge1xuICAgICAgICAgIHNvdXJjZU1hcDogdHJ1ZSxcbiAgICAgICAgICBkZWNsYXJhdGlvbjogdHJ1ZSxcbiAgICAgICAgICBkZWNsYXJhdGlvbk1hcDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgZXhjbHVkZTogWyd2aXRlLmNvbmZpZy50cycsICdfX3Rlc3RzX18nXSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczogW1xuICAgICAge1xuICAgICAgICBmaW5kOiAnLi9ydW50aW1lQ29uZmlnJyxcbiAgICAgICAgcmVwbGFjZW1lbnQ6ICcuL3J1bnRpbWVDb25maWcuYnJvd3NlcicsXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgY3NzQ29kZVNwbGl0OiBmYWxzZSxcbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiByZXNvbHZlUGF0aCgnLi9zcmMvaW5kZXgudHMnKSxcbiAgICAgIGZvcm1hdHM6IFsnZXMnLCAnY2pzJ10sXG4gICAgICBuYW1lOiAndWktdnVlJyxcbiAgICAgIGZpbGVOYW1lOiAoZm9ybWF0OiBzdHJpbmcpID0+XG4gICAgICAgIGZvcm1hdCA9PT0gJ2VzJyA/ICdpbmRleC5qcycgOiBgaW5kZXguJHtmb3JtYXR9YCxcbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIHBsdWdpbnM6IFtkeW5hbWljSW1wb3J0VmFyc10sXG4gICAgICBleHRlcm5hbDogWydhd3MtYW1wbGlmeScsICd2dWUnXSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBnbG9iYWxzOiB7XG4gICAgICAgICAgdnVlOiAnVnVlJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUVBLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sdUJBQXVCO0FBQzlCLE9BQU8sVUFBVTtBQUNqQixPQUFPLFNBQVM7QUFDaEIsT0FBTyxpQkFBaUI7QUFDeEIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxZQUFZO0FBRW5CLElBQU0sY0FBYyxDQUFDLFFBQWdCLEtBQUssUUFBUSxtREFBbUQsR0FBRztBQUV4RyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixPQUFPO0FBQUEsSUFDUCxXQUFXO0FBQUEsTUFDVCxNQUFNLENBQUMsMkJBQTJCO0FBQUEsTUFDbEMsU0FBUyxDQUFDLGNBQWM7QUFBQSxJQUMxQixDQUFDO0FBQUEsSUFDRCxZQUFZO0FBQUEsTUFDVixPQUFPO0FBQUEsTUFDUCxTQUFTLENBQUMsd0JBQXdCLGlDQUFpQztBQUFBLE1BQ25FLGtCQUFrQjtBQUFBLFFBQ2hCLGlCQUFpQjtBQUFBLFVBQ2YsV0FBVztBQUFBLFVBQ1gsYUFBYTtBQUFBLFVBQ2IsZ0JBQWdCO0FBQUEsUUFDbEI7QUFBQSxRQUNBLFNBQVMsQ0FBQyxrQkFBa0IsV0FBVztBQUFBLE1BQ3pDO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0w7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLGFBQWE7QUFBQSxNQUNmO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLGNBQWM7QUFBQSxJQUNkLEtBQUs7QUFBQSxNQUNILE9BQU8sWUFBWSxnQkFBZ0I7QUFBQSxNQUNuQyxTQUFTLENBQUMsTUFBTSxLQUFLO0FBQUEsTUFDckIsTUFBTTtBQUFBLE1BQ04sVUFBVSxDQUFDLFdBQ1QsV0FBVyxPQUFPLGFBQWEsU0FBUztBQUFBLElBQzVDO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixTQUFTLENBQUMsaUJBQWlCO0FBQUEsTUFDM0IsVUFBVSxDQUFDLGVBQWUsS0FBSztBQUFBLE1BQy9CLFFBQVE7QUFBQSxRQUNOLFNBQVM7QUFBQSxVQUNQLEtBQUs7QUFBQSxRQUNQO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
