declare module 'style-dictionary/lib/utils/deepExtend' {
  // based on the typing specified by style-dictionary:
  // https://github.com/amzn/style-dictionary/blob/main/lib/utils/deepExtend.js#L18-L22
  export default function deepExtend<T extends object>(
    objects: (object | undefined)[],
    collision?: Function,
    path?: string[]
  ): T;
}

declare module 'style-dictionary/lib/utils/flattenProperties' {
  // based on the typing specified by style-dictionary:
  // https://github.com/amzn/style-dictionary/blob/main/lib/utils/flattenProperties.js
  export default function flattenProperties(properties: object, to_ret?: Array): Array;
}

declare module 'style-dictionary/lib/utils/references/usesReference' {
  // based on the typing specified by style-dictionary:
  // https://github.com/amzn/style-dictionary/blob/main/lib/utils/references/usesReference.js
  export default function usesReference(value: string): boolean;
}
