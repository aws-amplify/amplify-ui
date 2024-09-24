import * as React from 'react';
import { createGlobalCSS } from '@aws-amplify/ui';
import { Style } from './Style';

interface GlobalStyleProps extends React.ComponentProps<'style'> {
  /**
   * Provide a server generated nonce which matches your CSP `style-src` rule.
   * This will be attached to the generated <style> tag.
   * @see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/style-src
   */
  nonce?: string;
  styles: Parameters<typeof createGlobalCSS>[0];
}

/**
 * @experimental
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/theme)
 */
export const GlobalStyle = ({
  styles,
  ...rest
}: GlobalStyleProps): JSX.Element | null => {
  if (!styles) {
    return null;
  }

  const cssText = createGlobalCSS(styles);

  return <Style {...rest} cssText={cssText} />;
};

GlobalStyle.displayName = 'GlobalStyle';
