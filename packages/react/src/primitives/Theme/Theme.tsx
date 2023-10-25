import * as React from 'react';
import { WebTheme } from '@aws-amplify/ui';
import {
  AriaProps,
  BaseComponentProps,
  ElementType,
  ForwardRefPrimitive,
  Primitive,
  PrimitiveProps,
} from '../types';
import { ThemeContainer } from './ThemeContainer';
import { ThemeStyle } from './ThemeStyle';

type ColorMode = 'system' | 'light' | 'dark';

interface BaseThemeProps extends BaseComponentProps, AriaProps {
  colorMode?: ColorMode;
  /**
   * Provide a server generated nonce which matches your CSP `style-src` rule.
   * This will be attached to the generated <style> tag.
   * @see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/style-src
   */
  nonce?: string;
  theme: WebTheme;
}

export type ThemeProps<Element extends ElementType = 'div'> = PrimitiveProps<
  BaseThemeProps,
  Element
>;

const ThemePrimitive: Primitive<ThemeProps, 'div'> = (
  { children, theme, nonce, colorMode = 'system', ...rest },
  ref
) => {
  return (
    <ThemeContainer {...rest} ref={ref} theme={theme} colorMode={colorMode}>
      {children}
      <ThemeStyle theme={theme} nonce={nonce} />
    </ThemeContainer>
  );
};

type ThemeType = ForwardRefPrimitive<BaseThemeProps, 'div'> & {
  Container: typeof ThemeContainer;
  Style: typeof ThemeStyle;
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/theme)
 */
export const Theme: ThemeType = Object.assign(
  React.forwardRef(ThemePrimitive),
  {
    Container: ThemeContainer,
    Style: ThemeStyle,
    displayName: 'Theme',
  }
);
