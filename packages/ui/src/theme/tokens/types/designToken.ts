export interface DesignToken {
  value: DesignTokenValue;
}

export type DesignTokenValue =
  | BorderWidthDesignToken
  | ColorDesignToken
  | FontDesignToken
  | FontSizeDesignToken
  | FontWeightDesignToken
  | LineHeightDesignToken
  | OpacityDesignToken
  | OutlineOffsetDesignToken
  | OutlineWidthDesignToken
  | RadiusDesignToken
  | ShadowDesignToken
  | SpaceDesignToken
  | TimeDesignToken
  | TransformDesignToken;

type BorderWidthDesignToken = string;
type ColorDesignToken = string;
type FontDesignToken = string;
type FontSizeDesignToken = string;
type FontWeightDesignToken = number;
type LineHeightDesignToken = string;
type OpacityDesignToken = string;
type OutlineOffsetDesignToken = string;
type OutlineWidthDesignToken = string;
type RadiusDesignToken = string;
type ShadowDesignToken = {
  offsetX: string;
  offsetY: string;
  blurRadius: string;
  color: string;
  spreadRadius?: string;
};
type SpaceDesignToken = string;
type TimeDesignToken = string;
type TransformDesignToken = string;
