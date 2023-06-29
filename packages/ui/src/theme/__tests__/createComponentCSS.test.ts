import { createComponentCSS } from '../createTheme';

describe('@aws-amplify/ui', () => {
  describe('createComponentCSS', () => {
    it('should pass through raw values', () => {
      expect(
        createComponentCSS(`[data-amplify-theme="test"]`, {
          badge: {
            backgroundColor: 'pink',
            borderRadius: '{radii.small}',
            size: {
              small: {
                borderRadius: '0',
              },
            },
          },
        })
      ).toEqual('.amplify-badge {}');
    });

    it('should pass through raw values', () => {
      expect(
        createComponentCSS(`[data-amplify-theme="test"]`, {
          alert: {
            backgroundColor: 'pink',
            borderRadius: '{radii.small}',
            heading: {
              fontSize: '{fontSizes.xl}',
            },
          },
        })
      ).toEqual('.amplify-alert {}');
    });

    it('should button', () => {
      expect(
        createComponentCSS(`[data-amplify-theme="test"]`, {
          button: {
            variation: {
              primary: {
                background: 'red',
                _hover: {
                  background: 'pink',
                  color: '{colors.font.primary}',
                },
              },
            },
          },
        })
      ).toEqual('.amplify-button {}');
    });
  });
});
