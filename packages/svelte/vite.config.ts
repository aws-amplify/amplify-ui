import { sveltekit } from '@sveltejs/kit/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';
import path from 'path';
import { defineConfig } from 'vite';

const resolvePath = (str: string) => path.resolve(__dirname, str);

export default defineConfig({
	plugins: [sveltekit(), svelteTesting()],
	test: {
		environment: 'happy-dom'
	},
	resolve: {
		alias: [
			{
				find: './runtimeConfig',
				replacement: './runtimeConfig.browser'
			}
		]
	},
	build: {
		lib: {
			entry: resolvePath('./src/lib/index.ts'),
			formats: ['es', 'cjs'],
			name: 'ui-svelte',
			fileName: (format: string) => (format === 'es' ? 'index.js' : `index.${format}`)
		},
		rollupOptions: {
			plugins: [dynamicImportVars],
			external: [
				'@aws-amplify/auth',
				'@aws-amplify/core',
				'@aws-amplify/core/internals/utils',
				'aws-amplify',
				'aws-amplify/auth',
				'aws-amplify/core',
				'aws-amplify/utils'
			]
		}
	}
});
