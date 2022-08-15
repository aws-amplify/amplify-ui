import { createTheme } from '../createTheme';

let consoleWarnSpy: jest.SpyInstance;
afterEach(() => {
  consoleWarnSpy?.mockRestore();
});

describe('@aws-amplify/ui', () => {
  describe('createTheme', () => {
    describe('without a base theme', () => {
      const { tokens } = createTheme({ name: 'test-theme' });

      // This will allow users to use the token in a style prop
      // without `.value` and for it to use the CSS variable
      // so it won't change even the value changes (with
      // references)
      it('should return tokens css variable declaration when used as a string', () => {
        expect(`${tokens.colors.background.error}`).toEqual(
          'var(--amplify-colors-background-error)'
        );
      });

      it('should return a css variable reference if present on token value', () => {
        expect(tokens.colors.background.error.value).toEqual(
          'var(--amplify-colors-red-20)'
        );
      });

      it('should return the variable name in var() when called with .toString()', () => {
        expect(tokens.colors.background.primary.toString()).toEqual(
          'var(--amplify-colors-background-primary)'
        );
      });

      it('should filter out deprecated pagination design tokens', () => {
        const theme = {
          name: 'test',
          tokens: {
            components: {
              pagination: {
                button: {
                  _hover: {
                    backgroundColor: {
                      value: 'red',
                    },
                    color: {
                      value: 'blue',
                    },
                  },
                  _disabled: {
                    color: {
                      value: 'grey',
                    },
                  },
                },
              },
            },
          },
        };
        const { cssText, tokens } = createTheme(theme);
        expect(cssText).toContain(
          `--amplify-components-pagination-button-hover-background-color: ${tokens.components.pagination.button._hover?.backgroundColor.value}`
        );
        expect(cssText).not.toContain(
          `--amplify-components-pagination-button-hover-background-color: ${tokens.components.pagination.button.hover?.backgroundColor.value}`
        );

        expect(cssText).toContain(
          `--amplify-components-pagination-button-hover-color: ${tokens.components.pagination.button._hover?.color.value}`
        );
        expect(cssText).not.toContain(
          `--amplify-components-pagination-button-hover-color: ${tokens.components.pagination.button.hover?.color.value}`
        );

        expect(cssText).toContain(
          `--amplify-components-pagination-button-disabled-color: ${tokens.components.pagination.button._disabled?.color.value}`
        );
        expect(cssText).not.toContain(
          `--amplify-components-pagination-button-disabled-color: ${tokens.components.pagination.button.disabled?.color.value}`
        );
      });

      it('should filter out the deprecated link tokens', () => {
        const theme = {
          name: 'test',
          tokens: {
            components: {
              link: {
                _active: {
                  color: {
                    value: 'red',
                  },
                },
                _focus: {
                  color: {
                    value: 'white',
                  },
                },
                _hover: {
                  color: {
                    value: 'green',
                  },
                },
                _visited: {
                  color: {
                    value: 'blue',
                  },
                },
              },
            },
          },
        };
        const { cssText, tokens } = createTheme(theme);
        expect(cssText).toContain(
          `--amplify-components-link-active-color: ${tokens.components.link._active?.color.value}`
        );
        expect(cssText).not.toContain(
          `--amplify-components-link-active-color: ${tokens.components.link.active?.color.value}`
        );

        expect(cssText).toContain(
          `--amplify-components-link-focus-color: ${tokens.components.link._focus?.color.value}`
        );
        expect(cssText).not.toContain(
          `--amplify-components-link-focus-color: ${tokens.components.link.focus?.color.value}`
        );

        expect(cssText).toContain(
          `--amplify-components-link-hover-color: ${tokens.components.link._hover?.color.value}`
        );
        expect(cssText).not.toContain(
          `--amplify-components-link-hover-color: ${tokens.components.link.hover?.color.value}`
        );

        expect(cssText).toContain(
          `--amplify-components-link-visited-color: ${tokens.components.link._visited?.color.value}`
        );
        expect(cssText).not.toContain(
          `--amplify-components-link-visited-color: ${tokens.components.link.visited?.color.value}`
        );
      });

      it('should filter out the deprecated switchfield tokens', () => {
        const theme = {
          name: 'test',
          tokens: {
            components: {
              switchfield: {
                thumb: {
                  _checked: {
                    transform: {
                      value: '{transforms.slideX.small.value}',
                    },
                  },
                },
                track: {
                  _checked: {
                    backgroundColor: {
                      value: 'red',
                    },
                  },
                },
              },
            },
          },
        };
        const { cssText, tokens } = createTheme(theme);
        expect(cssText).toContain(
          `--amplify-components-switchfield-thumb-checked-transform: ${tokens.components.switchfield.thumb._checked?.transform.value}`
        );
        expect(cssText).not.toContain(
          `--amplify-components-switchfield-thumb-checked-transform: ${tokens.components.switchfield.thumb.checked?.transform.value}`
        );

        expect(cssText).toContain(
          `--amplify-components-switchfield-track-checked-background-color: ${tokens.components.switchfield.track._checked?.backgroundColor.value}`
        );
        expect(cssText).not.toContain(
          `--amplify-components-switchfield-track-checked-background-color: ${tokens.components.switchfield.track.checked?.backgroundColor.value}`
        );
      });

      it('should filter out the deprecated table tokens', () => {
        const theme = {
          name: 'test',
          tokens: {
            components: {
              table: {
                row: {
                  _hover: {
                    backgroundColor: {
                      value: 'red',
                    },
                  },
                },
              },
            },
          },
        };
        const { cssText, tokens } = createTheme(theme);
        expect(cssText).toContain(
          `--amplify-components-table-row-hover-background-color: ${tokens.components.table.row._hover?.backgroundColor.value}`
        );
        expect(cssText).not.toContain(
          `--amplify-components-table-row-hover-background-color: ${tokens.components.table.row.hover?.backgroundColor.value}`
        );
      });
    });

    describe('with a theme and without a base theme', () => {
      const theme = createTheme({
        name: 'test-theme',
        tokens: {
          colors: {
            background: {
              primary: { value: '#bada55' },
            },
            font: {
              primary: { value: '{colors.white.value}' },
            },
          },
        },
      });

      it('should override the base theme', () => {
        const { tokens } = theme;
        expect(tokens.colors.background.primary.value).toEqual('#bada55');
      });

      it('should handle being extended again', () => {
        const newTheme = createTheme(
          {
            name: 'test-theme',
            tokens: {
              colors: {
                background: {
                  secondary: { value: '#ff9900' },
                },
              },
            },
          },
          theme
        );
        const { tokens } = newTheme;
        expect(tokens.colors.background.secondary.value).toEqual('#ff9900');
        expect(tokens.colors.background.primary.value).toEqual('#bada55');
      });
    });

    describe('error handling', () => {
      it('should warn the user and not do a max-call stack if given an invalid theme object', () => {
        consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
        const theme = createTheme({
          name: 'my-theme',
          tokens: {
            colors: {
              background: {
                //@ts-expect-error
                primary: '#f90',
              },
            },
          },
        });
        expect(theme.tokens.colors.background.primary).toEqual('#f90');
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn)
          .toHaveBeenCalledWith(`Non-design token found when creating the theme at path: colors.background.primary
Did you forget to add '{value:"#f90"}'?`);
      });
    });
  });
});
