declare module 'style-dictionary/lib/utils/deepExtend' {
  // based on the typing specified by style-dictionary:
  // https://github.com/amzn/style-dictionary/blob/main/lib/utils/deepExtend.js#L18-L22
  export default function deepExtend(
    objects: (object | undefined)[],
    collision?: Function,
    path?: string[]
  ): object;
}
