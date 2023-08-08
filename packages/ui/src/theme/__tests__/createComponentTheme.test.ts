import { createComponentCSS } from '../createTheme';
import { createComponentTheme } from '../createComponentTheme';
import { defaultTheme } from '../defaultTheme';

describe('@aws-amplify/ui', () => {
  describe('createComponentCSS', () => {
    it('should pass through raw values', () => {
      const { css, className } = createComponentTheme(
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

    // it('should pass through raw values', () => {
    //   expect(
    //     createComponentCSS(
    //       `[data-amplify-theme="test"]`,
    //       {
    //         alert: {
    //           backgroundColor: 'pink',
    //           borderRadius: '{radii.small}',
    //           heading: {
    //             fontSize: '{fontSizes.xl}',
    //           },
    //         },
    //       },
    //       defaultTheme.tokens
    //     ).css
    //   ).toEqual('.amplify-alert {}');
    // });

    it('should button', () => {
      expect(
        createComponentTheme(
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
      const { css, className } = createComponentTheme(
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
