const CHARACTERS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const CHARACTERS_LENGTH = CHARACTERS.length;

export const generateString = (length: number): string => {
  let result = '';
  let counter = 0;
  while (counter < length) {
    result += CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS_LENGTH));
    counter += 1;
  }
  return result;
};

export const randomDate = (start: Date, end: Date): Date =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

export const randomNumberInRange = (min: number, max: number): number =>
  Math.round(Math.random() * (max - min) + min);

export async function timeout(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}
