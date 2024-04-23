import { createComponentTheme } from '../createTheme';
import { WebTokens } from '../tokens';
import { WebTheme } from '../types';
import {
  Modifiers,
  BaseProperties,
  Elements,
  ColorTheme,
  BaseTheme,
} from './utils';

export type AlertTheme<Required extends boolean = false> = BaseProperties &
  Modifiers<ColorTheme, Required> &
  Elements<'icon' | 'heading' | 'body' | 'dismiss', Required>;

export const alertTheme = createComponentTheme<AlertTheme<true>>({
  name: 'alert',
  theme(tokens) {
    const {
      components: { alert },
    } = tokens;
    return {
      alignItems: alert.alignItems,
      backgroundColor: alert.backgroundColor,
      color: alert.color,
      _modifiers: {
        info: {
          color: alert.info.color,
          backgroundColor: alert.info.backgroundColor,
        },
        // Type error unless these are defined because they are in the alert theme definition
        // TODO: fill in these styles
        error: {},
        success: {},
        warning: {},
      },
      _element: {
        icon: {
          fontSize: alert.icon.size,
          lineHeight: 1,
        },
        heading: {
          display: 'block',
          fontSize: alert.heading.fontSize,
          fontWeight: alert.heading.fontSize,
        },
        body: {
          color: 'inherit',
          display: 'block',
        },
        dismiss: {
          color: 'inherit',
        },
      },
    };
  },
});

type MyTokens = WebTheme['tokens'] & {
  colors: WebTheme['tokens']['colors'] & {
    hotPink: {
      10: any;
    };
  };
};

const test = createComponentTheme({
  name: 'alert',
  theme(tokens: MyTokens) {
    return {
      _modifiers: {
        info: {},
        success: {
          backgroundColor: tokens.colors.hotPink[10],
        },
      },
    };
  },
  overrides: [
    {
      colorMode: 'dark',
      theme(tokens) {
        return {
          _modifiers: {
            info: {},
          },
        };
      },
    },
  ],
});
