import { ALPHABET } from './constants';

export const generateNumber = (offset = 2) =>
  Number(
    Math.random()
      .toFixed(2)
      .slice(2, 2 + offset)
  );

export const generateIndex = (): number => {
  const index = generateNumber();
  return index < ALPHABET.length ? index : generateIndex();
};

const generateCharacter = () => `${ALPHABET[generateIndex()]}`;

export const generateString = (max = 20): string => {
  if (max > 50) {
    throw new Error('`max` value greater than 50 is not allowed');
  }

  return new Array(max).fill(null).map(generateCharacter).join('');
};

export const maybe = () => Math.random() > 0.5;
