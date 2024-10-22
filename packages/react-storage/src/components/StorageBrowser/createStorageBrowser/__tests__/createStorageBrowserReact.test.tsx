import { expectTypeTestsToPassAsync } from 'jest-tsd';

// evaluates type defs in corresponding test-d.ts file
it('should not produce static type errors', async () => {
  await expectTypeTestsToPassAsync(__filename);
});
