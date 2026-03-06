export function convertBufferToBase64(
  buffer: ArrayBuffer,
  format: 'png' | 'jpeg' | 'gif' | 'webp'
): string {
  const base64string = Buffer.from(new Uint8Array(buffer)).toString('base64');
  return `data:image/${format};base64,${base64string}`;
}
