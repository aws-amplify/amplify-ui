declare module 'style-dictionary/lib/utils/references/usesReference.js' {
  // based on the typing specified by style-dictionary:
  // https://github.com/amzn/style-dictionary/blob/main/lib/utils/references/usesReference.js
  export default function usesReference(value: string): boolean;
}


declare module 'style-dictionary/lib/utils/deepExtend.js' {
  // based on the typing specified by style-dictionary:
  // https://github.com/amzn/style-dictionary/blob/main/lib/utils/deepExtend.js#L18-L22
  export default function deepExtend<T>(
    objects: (object | undefined)[],
    collision?: Function,
    path?: string[]
  ): T;
}


declare module 'style-dictionary/lib/utils/flattenProperties.js' {
  // based on the typing specified by style-dictionary:
  // https://github.com/amzn/style-dictionary/blob/main/lib/utils/flattenProperties.js#L16-L24
  export default function flattenProperties(
    properties: object,
    acc?: Array<any>
  ): Array<any>;
}
