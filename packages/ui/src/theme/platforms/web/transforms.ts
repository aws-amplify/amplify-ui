import { Transform } from 'style-dictionary';
import { cssNameTransform, cssValue } from '../../utils';

export const WebTransforms: Record<string, Transform> = {
  cssNameTransform: {
    type: 'name',
    transformer: cssNameTransform,
  },
  cssValue: {
    type: 'value',
    transitive: true,
    transformer: cssValue,
  },
};
