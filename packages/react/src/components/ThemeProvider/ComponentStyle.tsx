import * as React from 'react';
import { WebTheme, createComponentCSS } from '@aws-amplify/ui';
import {
  BaseComponentProps,
  ElementType,
  ForwardRefPrimitive,
  Primitive,
  PrimitiveProps,
} from '../../primitives/types';
import { primitiveWithForwardRef } from '../../primitives/utils/primitiveWithForwardRef';
import { BaseComponentTheme } from '@aws-amplify/ui';
import { Style } from './Style';

interface BaseComponentStyleProps extends BaseComponentProps {
  /**
   * Provide a server generated nonce which matches your CSP `style-src` rule.
   * This will be attached to the generated <style> tag.
   * @see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/style-src
   */
  nonce?: string;
  theme: Pick<WebTheme, 'name' | 'breakpoints' | 'tokens'>;
  componentThemes: BaseComponentTheme[];
}

export type ComponentStyleProps<Element extends ElementType = 'style'> =
  PrimitiveProps<BaseComponentStyleProps, Element>;

const ComponentStylePrimitive: Primitive<ComponentStyleProps, 'style'> = (
  { theme, componentThemes = [], ...rest },
  ref
) => {
  if (!theme || !componentThemes.length) {
    return null;
  }

  const cssText = createComponentCSS({
    theme,
    components: componentThemes,
  });

  return <Style {...rest} ref={ref} cssText={cssText} />;
};

/**
 * @experimental
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/theme)
 */
export const ComponentStyle: ForwardRefPrimitive<
  BaseComponentStyleProps,
  'style'
> = primitiveWithForwardRef(ComponentStylePrimitive);

ComponentStyle.displayName = 'ComponentStyle';
