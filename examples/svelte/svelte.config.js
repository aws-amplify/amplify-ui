import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		vite: {
			resolve: {
				alias: {
					'./runtimeConfig': './runtimeConfig.browser',
					entries: {
						svelte: path.join(__dirname, '../../node_modules/svelte')
					}
				}
			}
		}
	}
};

export default config;
