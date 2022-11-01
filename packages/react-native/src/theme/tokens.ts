import { Colors, ComponentStyles, Tokens } from './types';

export const colors: Partial<Colors> = {
  brand: {
    primary: {
      10: 'hsl(190, 75%, 95%)',
      20: 'hsl(190, 75%, 85%)',
      40: 'hsl(190, 70%, 70%)',
      60: 'hsl(190, 50%, 50%)',
      80: 'hsl(190, 95%, 30%)',
      90: 'hsl(190, 100%, 20%)',
      100: 'hsl(190, 100%, 15%)',
    },
    secondary: {
      10: 'hsl(300, 75%, 95%)',
      20: 'hsl(300, 75%, 85%)',
      40: 'hsl(300, 70%, 70%)',
      60: 'hsl(300, 50%, 50%)',
      80: 'hsl(300, 95%, 30%)',
      90: 'hsl(300, 100%, 20%)',
      100: 'hsl(300, 100%, 15%)',
    },
  },
};

export const components: ComponentStyles = {
  //TODO: add component styles
};

export const tokens: Tokens = {
  colors,
  components,
};
