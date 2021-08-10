export const isIconFilled = (
  currentIconIndex: number,
  ratingValue: number
): boolean => {
  if (currentIconIndex <= ratingValue) return true;
  return false;
};

export const isIconEmpty = (
  currentIconIndex: number,
  ratingValue: number
): boolean => {
  if (currentIconIndex - 1 >= ratingValue) return true;
  return false;
};

export const isIconMixed = (
  currentIconIndex: number,
  ratingValue: number
): boolean => {
  if (currentIconIndex > ratingValue && currentIconIndex - 1 < ratingValue) {
    return true;
  }
  return false;
};
