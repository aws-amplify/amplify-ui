import { isDesignToken } from '@aws-amplify/ui';
import { Namespace } from './TokenList';
import {
  SpaceBlock,
  BorderWidthBlock,
  FontFamilyBlock,
  FontSizeBlock,
  LineHeightBlock,
  FontWeightBlock,
  ColorBlock,
  RadiusBlock,
  GenericBlock,
} from './TokenBlocks';

export function createTokenList(tokens) {
  const tokenList = [];
  function iterateGroup(group) {
    Object.values(group).forEach((value) => {
      if (isDesignToken(value)) {
        tokenList.push({
          ...value,
        });
      } else {
        iterateGroup(value);
      }
    });
  }
  if (isDesignToken(tokens)) {
    tokenList.push(tokens);
  } else {
    iterateGroup(tokens);
  }
  return tokenList;
}

export function getTokenBlock(namespace: Namespace) {
  switch (namespace) {
    case 'fontWeights':
      return FontWeightBlock;
    case 'fontSizes':
      return FontSizeBlock;
    case 'fonts':
      return FontFamilyBlock;
    case 'lineHeights':
      return LineHeightBlock;
    case 'borderWidths':
      return BorderWidthBlock;
    case 'space':
      return SpaceBlock;
    case 'colors':
      return ColorBlock;
    case 'radii':
      return RadiusBlock;
    default:
      return GenericBlock;
  }
}
