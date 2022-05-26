import {
  DesignToken,
  ObjectFitValue,
  PositionValue,
  SpaceValue,
} from '../types/designToken';

export interface ImageTokens {
  maxWidth: DesignToken<SpaceValue>;
  height: DesignToken<SpaceValue>;
  objectFit: DesignToken<ObjectFitValue>;
  objectPosition: DesignToken<PositionValue>;
}

export const image: ImageTokens = {
  maxWidth: { value: '100%' },
  height: { value: 'auto' },
  objectFit: { value: 'initial' },
  objectPosition: { value: 'initial' },
};
