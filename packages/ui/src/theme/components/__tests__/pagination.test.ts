import { createComponentTheme, createTheme } from '../../createTheme';
import { PaginationTheme } from '../pagination';

const paginationTheme = createComponentTheme<PaginationTheme<true>>({
  name: 'pagination',
  theme(tokens) {
    const {
      components: { pagination },
    } = tokens;
    return {
      listStyleType: 'none',
      _element: {
        item: {
          height: pagination.itemShared.height,
          minWidth: pagination.itemShared.minWidth,
          _modifiers: {
            type: {
              disabled: {},
              current: {},
              ellipsis: {},
            },
          },
        },
      },
    };
  },
});

const { cssText } = createTheme({
  name: 'test',
  components: [paginationTheme],
});

describe('@aws-amplify/ui', () => {
  describe('component themes', () => {
    describe('pagination', () => {
      it('should have default values', () => {
        expect(cssText).toBeDefined();
      });
    });
  });
});
