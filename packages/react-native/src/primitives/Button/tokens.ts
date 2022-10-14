import { ColorValue } from '@aws-amplify/ui';

interface ButtonTextToken {
  color: ColorValue;
}

interface ButtonContainerToken {
  backgroundColor: ColorValue;
}

export interface ButtonTokens {
  container: ButtonContainerToken;
  disabled: ButtonContainerToken;
  text: ButtonTextToken;
  disabledText: ButtonTextToken;
}

export const button: ButtonTokens = {
  container: {
    backgroundColor: '{colors.brand.primary[10]}',
  },
  text: {
    color: '{colors.brand.primary[100]}',
  },
  disabled: {
    backgroundColor: '{colors.brand.primary[20]}',
  },
  disabledText: {
    color: '{colors.brand.primary[20]}',
  },
};
