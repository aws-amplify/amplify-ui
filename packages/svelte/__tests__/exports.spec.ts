import { describe, expect, it } from 'vitest';

import * as exported from '../src/lib';

describe('@aws-amplify/ui-svelte', () => {
	describe('exports', () => {
		it('should match snapshot', () => {
			const sortedExports = Object.keys(exported).sort();
			expect(sortedExports).toMatchSnapshot();
		});
	});
});
