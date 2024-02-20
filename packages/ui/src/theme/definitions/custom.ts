import type { DefineThemeDefinition } from './defineThemeDefinition';
import { createComponentTheme } from './createComponentTheme';

// NOTE THAT SHOULD BE DELETED: this whole file should be deleted, example code can go in a unit test file
type MyElements = 'elOne' | 'elTwo';
interface MyModifiers {
  variant: 'smallish' | 'largish';
}

const customTheme: DefineThemeDefinition<MyModifiers, MyElements> = {
  _modifiers: {
    variant: {
      smallish: { width: 'fit-content' },
      largish: { width: 'max-content' },
    },
  },
  _elements: {
    elOne: {
      alignContent: 'baseline',
      _modifiers: { variant: { smallish: { visibility: 'hidden' } } },
    },
  },
};

const customComponentTheme = createComponentTheme({
  name: 'myComponent',
  theme: customTheme,
  overrides: {
    theme: { _elements: { elOne: { alignContent: 'baseline' } } },
  },
});

customComponentTheme.classname({
  modifiers: { variant: 'largish' },
  element: 'elTwo',
});
