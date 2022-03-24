interface OutlinedToken {
  backgroundColor: any;
  borderRadius: any;
  borderWidth: any;
  borderStyle: any;
  borderColor: any;
  boxShadow: any;
}
interface ElevatedToken {
  backgroundColor: any;
  borderRadius: any;
  borderWidth: any;
  borderStyle: any;
  borderColor: any;
  boxShadow: any;
}
export interface CardTokens {
  backgroundColor: any;
  borderRadius: any;
  borderWidth: any;
  borderStyle: any;
  borderColor: any;
  boxShadow: any;
  padding: any;
  outlined: OutlinedToken;
  elevated: ElevatedToken;
}

export const card: CardTokens = {
  backgroundColor: { value: '{colors.background.primary.value}' },
  borderRadius: { value: '{radii.xs.value}' },
  borderWidth: { value: '0' },
  borderStyle: { value: 'solid' },
  borderColor: { value: 'transparent' },
  boxShadow: { value: 'none' },
  padding: { value: '{space.medium.value}' },

  outlined: {
    backgroundColor: { value: '{components.card.backgroundColor.value}' },
    borderRadius: { value: '{radii.xs.value}' },
    borderWidth: { value: '{borderWidths.small.value}' },
    borderStyle: { value: 'solid' },
    borderColor: { value: '{colors.border.primary.value}' },
    boxShadow: { value: '{components.card.boxShadow.value}' },
  },

  elevated: {
    backgroundColor: { value: '{components.card.backgroundColor.value}' },
    borderRadius: { value: '{radii.xs.value}' },
    borderWidth: { value: '0' },
    borderStyle: { value: 'solid' },
    borderColor: { value: 'transparent' },
    boxShadow: { value: '{shadows.medium.value}' },
  },
};
