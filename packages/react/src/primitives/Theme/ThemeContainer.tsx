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

type ColorMode = 'system' | 'light' | 'dark';

interface BaseThemeContainerProps extends BaseComponentProps, AriaProps {
  colorMode?: ColorMode;
  /**
   * Provide a server generated nonce which matches your CSP `style-src` rule.
   * This will be attached to the generated <style> tag.
   * @see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/style-src
   */
  nonce?: string;
  theme: WebTheme;
}

export type ThemeContainerProps<Element extends ElementType = 'div'> =
  PrimitiveProps<BaseThemeContainerProps, Element>;

const ThemeContainerPrimitive: Primitive<ThemeContainerProps, 'div'> = (
  { children, theme, testId, colorMode = 'system', ...rest },
  ref
) => {
  const { name } = theme;
  return (
    <div
      {...rest}
      {...(testId ? { 'data-testid': testId } : {})}
      ref={ref}
      data-amplify-theme={name}
      data-amplify-color-mode={colorMode}
    >
      {children}
    </div>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/theme)
 */
export const ThemeContainer: ForwardRefPrimitive<
  BaseThemeContainerProps,
  'div'
> = React.forwardRef(ThemeContainerPrimitive);

ThemeContainer.displayName = 'Theme.Container';
