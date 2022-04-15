import { DesignToken, AlignItemsValue, GapValue } from '../types/designToken';

interface FieldGroupVerticalTokens {
  alignItems: DesignToken<AlignItemsValue>;
}
interface FieldGroupOuterTokens {
  alignItems: DesignToken<AlignItemsValue>;
}
export interface FieldGroupTokens {
  gap: DesignToken<GapValue>;
  vertical: FieldGroupVerticalTokens;
  outer: FieldGroupOuterTokens;
}

export const fieldgroup: FieldGroupTokens = {
  gap: { value: '{space.zero.value}' },
  vertical: {
    alignItems: { value: 'center' },
  },
  outer: {
    alignItems: { value: 'center' },
  },
};
