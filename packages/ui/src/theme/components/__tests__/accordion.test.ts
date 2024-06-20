import { createComponentTheme, createTheme } from '../../createTheme';
import { AccordionTheme } from '../accordion';

const accordionTheme = createComponentTheme<AccordionTheme<true>>({
  name: 'accordion',
  theme(tokens) {
    return {
      _element: {
        item: {},
        item__content: {},
        item__icon: {},
        item__trigger: {},
      },
    };
  },
});

const { cssText } = createTheme({
  name: 'test',
  components: [accordionTheme],
});

describe('@aws-amplify/ui', () => {
  describe('component themes', () => {
    describe('accordion', () => {
      it('should have default values', () => {
        expect(cssText).toBeDefined();
      });
    });
  });
});
