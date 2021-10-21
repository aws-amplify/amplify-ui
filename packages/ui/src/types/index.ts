export * from './authMachine';
export * from './validator';

// Prevents usage of T from being automatically inferred.
// https://github.com/Microsoft/TypeScript/issues/14829#issuecomment-504042546
export type NoInfer<T> = [T][T extends any ? 0 : never];
