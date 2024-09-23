import * as React from 'react';
import { createGlobalCSS } from '@aws-amplify/ui';
import {
  BaseComponentProps,
  ElementType,
  ForwardRefPrimitive,
  Primitive,
  PrimitiveProps,
} from '../../primitives/types';
import { primitiveWithForwardRef } from '../../primitives/utils/primitiveWithForwardRef';
import { Style } from './Style';

interface BaseGlobalStyleProps extends BaseComponentProps {
  /**
   * Provide a server generated nonce which matches your CSP `style-src` rule.
   * This will be attached to the generated <style> tag.
   * @see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/style-src
   */
  nonce?: string;
  styles: Parameters<typeof createGlobalCSS>[0];
}

export type GlobalStyleProps<Element extends ElementType = 'style'> =
  PrimitiveProps<BaseGlobalStyleProps, Element>;

const GlobalStylePrimitive: Primitive<GlobalStyleProps, 'style'> = (
  { styles, ...rest },
  ref
) => {
  if (!styles) {
    return null;
  }

  const cssText = createGlobalCSS(styles);

  return <Style {...rest} ref={ref} cssText={cssText} />;
};

/**
 * @experimental
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/theme)
 */
export const GlobalStyle: ForwardRefPrimitive<BaseGlobalStyleProps, 'style'> =
  primitiveWithForwardRef(GlobalStylePrimitive);

GlobalStyle.displayName = 'GlobalStyle';
