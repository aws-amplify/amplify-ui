import { useCallback } from 'react';

export function helloWorld(name: string) {
  return `Hello ${name}!`;
}

export function useHelloWorld(name: string) {
  return useCallback(() => helloWorld(name), [name]);
}
