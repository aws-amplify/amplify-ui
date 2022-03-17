import { useCallback } from 'react';

export const manyParams = (params: {
  one: string;
  two: string;
  three: string;
  four: string;
}): Record<string, string> => params;

const internalHelloWorld = (name: string) => `Hello ${name}!`;

export function helloWorld(name: string): string {
  return internalHelloWorld(name);
}

export function useHelloWorld(name: string): typeof helloWorld {
  return useCallback(() => helloWorld(name), [name]);
}
