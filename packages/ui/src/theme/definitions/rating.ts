import type { Size } from './modifiers';
import type { DefineThemeDefinition } from './defineThemeDefinition';

import { createComponentTheme } from './createComponentTheme';

// NOTE THAT SHOULD BE DELETED: should be exported and consumed in `RatingProps`
type RatingSize = Size;
interface RatingModifiers {
  size?: RatingSize;
}

type RatingElement = 'icon' | 'item';

export interface RatingThemeDefinition
  extends DefineThemeDefinition<RatingModifiers, RatingElement> {}

// example code
export const ratingTheme: RatingThemeDefinition = {
  _elements: {
    icon: { _modifiers: { size: {} } },
    // @ts-expect-error
    no: {},
  },
  _modifiers: { size: {} },
};

// example code
const ratingClassname = createComponentTheme({
  name: 'rating',
  theme: ratingTheme,
});

// example code
ratingClassname.classname({ element: 'icon', modifiers: { size: 'large' } });
