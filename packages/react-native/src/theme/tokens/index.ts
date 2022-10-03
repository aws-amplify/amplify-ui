import { colors, Colors } from '@aws-amplify/ui/dist/types/theme/tokens/colors';
import {
  fontSizes,
  FontSizes,
} from '@aws-amplify/ui/dist/types/theme/tokens/fontSizes';
import {
  fontWeights,
  FontWeights,
} from '@aws-amplify/ui/dist/types/theme/tokens/fontWeights';
import {
  opacities,
  Opacities,
} from '@aws-amplify/ui/dist/types/theme/tokens/opacities';
import { radii, Radii } from '@aws-amplify/ui/dist/types/theme/tokens/radii';
import { space, Space } from '@aws-amplify/ui/dist/types/theme/tokens/space';
import { time, Time } from '@aws-amplify/ui/dist/types/theme/tokens/time';
import { components } from './components';

import { ComponentStyles } from '../types';

interface BaseTokens {
  colors: Colors;
  fontSizes: FontSizes;
  fontWeights: FontWeights;
  opacities: Opacities;
  radii: Radii;
  space: Space;
  time: Time;
}

export interface Tokens extends BaseTokens {
  components: ComponentStyles;
}

export const tokens: Tokens = {
  components,
  colors,
  fontSizes,
  fontWeights,
  opacities,
  radii,
  space,
  time,
};
