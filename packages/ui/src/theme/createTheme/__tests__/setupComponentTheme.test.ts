import { setupComponentTheme } from '../setupComponentTheme';
import { createTheme } from '../createTheme';

const { tokens } = createTheme();

describe('@aws-amplify/ui', () => {
  describe('setupComponentTheme', () => {
    it('should pass through raw values', () => {
      const css = setupComponentTheme(
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
        tokens
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
                  ':hover': {
                    background: 'pink',
                    color: '{colors.font.primary}',
                  },
                },
              },
            },
          },
          tokens
        )
      ).toMatchInlineSnapshot(`
        "[data-amplify-theme=\\"test\\"] .amplify-button--primary:hover { background:pink;  color:var(--amplify-colors-font-primary);  }
        [data-amplify-theme=\\"test\\"] .amplify-button--primary { background:red;  }
        "
      `);
    });

    it('can use custom primitives', () => {
      const css = setupComponentTheme(
        `[data-amplify-theme="test"]`,
        {
          chip: {
            paddingInline: '{space.xs}',
            paddingBlock: '{space.xs}',
            borderRadius: '{radii.small}',
            modifier: {
              primary: {
                background: 'red',
                ':hover': {
                  background: 'pink',
                  color: '{colors.font.primary}',
                },
              },
            },
          },
        },
        createTheme().tokens
      );
      expect(css).toMatchInlineSnapshot(`
        "[data-amplify-theme=\\"test\\"] .amplify-chip { padding-inline:var(--amplify-space-xs);  padding-block:var(--amplify-space-xs);  border-radius:var(--amplify-radii-small);  }
        [data-amplify-theme=\\"test\\"] .amplify-chip--primary:hover { background:pink;  color:var(--amplify-colors-font-primary);  }
        [data-amplify-theme=\\"test\\"] .amplify-chip--primary { background:red;  }
        "
      `);
    });
  });
});
