declare module 'style-dictionary/lib/utils/deepExtend' {
  // based on the typing specified by style-dictionary:
  // https://github.com/amzn/style-dictionary/blob/main/lib/utils/deepExtend.js#L18-L22
  export default function deepExtend(
    objects: (object | undefined)[],
    collision?: Function,
    path?: string[]
  ): object;
}

declare module 'style-dictionary/lib/utils/references/usesReference' {
  // based on the typing specified by style-dictionary:
  // https://github.com/amzn/style-dictionary/blob/main/lib/utils/references/usesReference.js
  export default function usesReference(value: string): boolean;
}

declare module 'style-dictionary/lib/utils/resolveObject' {
  // based on the typing specified by style-dictionary:
  // https://github.com/amzn/style-dictionary/blob/main/lib/utils/resolveObject.js
  export default function resolveObject<T>(object: T): T;
}
