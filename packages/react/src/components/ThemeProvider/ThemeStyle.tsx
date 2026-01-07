import * as React from 'react';
import type { WebTheme } from '@aws-amplify/ui';
import { Style } from './Style';

interface ThemeStyleProps extends React.ComponentProps<'style'> {
  /**
   * Provide a server generated nonce which matches your CSP `style-src` rule.
   * This will be attached to the generated <style> tag.
   * @see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/style-src
   */
  nonce?: string;
  theme?: WebTheme;
}

export const ThemeStyle = ({
  theme,
  ...rest
}: ThemeStyleProps): React.JSX.Element | null => {
  if (!theme) return null;

  const { name, cssText } = theme;
  return <Style {...rest} cssText={cssText} id={`amplify-theme-${name}`} />;
};

ThemeStyle.displayName = 'ThemeStyle';
