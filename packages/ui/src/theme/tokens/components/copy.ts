export interface CopyTokens {
  fontSize: any;
  gap: any;
  svg: any;
  toolTip: any;
}

export const copy: CopyTokens = {
  fontSize: { value: '{font.sizes.xs.value}' },
  gap: { value: '{space.relative.medium.value}' },

  svg: {
    path: {
      fill: {
        value: '{colors.font.primary}',
      },
    },
  },
  toolTip: {
    bottom: { value: '{space.large}' },
    color: { value: '{colors.teal.100}' },
    fontSize: { value: '{font.sizes.xxs}' },
  },
};
