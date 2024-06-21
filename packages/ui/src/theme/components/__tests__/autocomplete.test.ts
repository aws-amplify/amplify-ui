import { createComponentTheme, createTheme } from '../../createTheme';
import { AutoCompleteTheme } from '../autocomplete';

const autocompleteTheme = createComponentTheme<AutoCompleteTheme>({
  name: 'autocomplete',
  theme(tokens) {
    return {
      // _element: {
      //   item: {},
      //   item__content: {},
      //   item__icon: {},
      //   item__trigger: {},
      // },
    };
  },
});

const { cssText } = createTheme({
  name: 'test',
  components: [autocompleteTheme],
});

describe('@aws-amplify/ui', () => {
  describe('component themes', () => {
    describe('accordion', () => {
      it('should have default values', () => {
        let isActive;
        expect(
          autocompleteTheme.className({
            _element: { menu__option: isActive ? 'active' : undefined },
          })
        ).toEqual(`amplify-autocomplete__menu__option`);
      });
    });
  });
});
