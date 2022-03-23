export interface ImageTokens {
  maxWidth: never;
  height: never;
  objectFit: never;
  objectPosition: never;
}
export const image: ImageTokens = {
  maxWidth: { value: '100%' },
  height: { value: 'auto' },
  objectFit: { value: 'initial' },
  objectPosition: { value: 'initial' },
};
