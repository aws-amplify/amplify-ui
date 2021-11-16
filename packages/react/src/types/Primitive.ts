// See: https://github.com/sindresorhus/type-fest/blob/main/source/primitive.d.ts

/**
Matches any [primitive value](https://developer.mozilla.org/en-US/docs/Glossary/Primitive).
@category Basic
*/
export type Primitive =
  | null
  | undefined
  | string
  | number
  | boolean
  | symbol
  | bigint;
