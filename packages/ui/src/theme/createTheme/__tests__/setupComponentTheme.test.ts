import { setupComponentTheme } from '../setupComponentTheme';
import { defaultTheme } from '../../defaultTheme';

describe('@aws-amplify/ui', () => {
  describe('setupComponentTheme', () => {
    it('should pass through raw values', () => {
      const { css } = setupComponentTheme(
        `[data-amplify-theme="test"]`,
        {
          badge: {
            backgroundColor: 'pink',
            borderRadius: '{radii.small}',
            modifier: {
              small: {
                borderRadius: '0',
              },
            },
          },
        },
        defaultTheme.tokens
      );
      expect(css).toMatchInlineSnapshot(`
        "[data-amplify-theme=\\"test\\"] .amplify-badge { background-color:pink;  border-radius:var(--amplify-radii-small);  }
        [data-amplify-theme=\\"test\\"] .amplify-badge--small { border-radius:0;  }
        "
      `);
    });

    it('should button', () => {
      expect(
        setupComponentTheme(
          `[data-amplify-theme="test"]`,
          {
            button: {
              modifier: {
                primary: {
                  background: 'red',
                  _hover: {
                    background: 'pink',
                    color: '{colors.font.primary}',
                  },
                },
              },
            },
          },
          defaultTheme.tokens
        ).css
      ).toMatchInlineSnapshot(`
        "[data-amplify-theme=\\"test\\"] .amplify-button--primary { background:red;  }
        [data-amplify-theme=\\"test\\"] .amplify-button--primary:hover { background:pink;  color:var(--amplify-colors-font-primary);  }
        "
      `);
    });

    it('can use custom primitives', () => {
      const { css, className } = setupComponentTheme(
        `[data-amplify-theme="test"]`,
        {
          chip: {
            paddingInline: '{space.xs}',
            paddingBlock: '{space.xs}',
            borderRadius: '{radii.small}',
            modifier: {
              primary: {
                background: 'red',
                _hover: {
                  background: 'pink',
                  color: '{colors.font.primary}',
                },
              },
            },
          },
        },
        defaultTheme.tokens
      );
      expect(className.chip({ modifier: 'primary' })).toEqual(
        'amplify-chip--primary'
      );
      expect(css).toMatchInlineSnapshot(`
        "[data-amplify-theme=\\"test\\"] .amplify-chip { padding-inline:var(--amplify-space-xs);  padding-block:var(--amplify-space-xs);  border-radius:var(--amplify-radii-small);  }
        [data-amplify-theme=\\"test\\"] .amplify-chip--primary { background:red;  }
        [data-amplify-theme=\\"test\\"] .amplify-chip--primary:hover { background:pink;  color:var(--amplify-colors-font-primary);  }
        "
      `);
    });
  });
});
