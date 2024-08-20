import * as React from 'react';
import { WebTheme } from '@aws-amplify/ui';
import {
  BaseComponentProps,
  ElementType,
  ForwardRefPrimitive,
  Primitive,
  PrimitiveProps,
} from '../../primitives/types';
import { primitiveWithForwardRef } from '../../primitives/utils/primitiveWithForwardRef';

interface BaseStyleThemeProps extends BaseComponentProps {
  /**
   * Provide a server generated nonce which matches your CSP `style-src` rule.
   * This will be attached to the generated <style> tag.
   * @see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/style-src
   */
  nonce?: string;
  theme?: WebTheme;
}

export type ThemeStyleProps<Element extends ElementType = 'style'> =
  PrimitiveProps<BaseStyleThemeProps, Element>;

const ThemeStylePrimitive: Primitive<ThemeStyleProps, 'style'> = (
  { theme, nonce, ...rest },
  ref
) => {
  if (!theme) return null;

  const { name, cssText } = theme;
  /*
    Only inject theme CSS variables if given a theme.
    The CSS file users import already has the default theme variables in it.
    This will allow users to use the provider and theme with CSS variables
    without having to worry about specificity issues because this stylesheet
    will likely come after a user's defined CSS.

    Q: Why are we using dangerouslySetInnerHTML?
    A: We need to directly inject the theme's CSS string into the <style> tag without typical HTML escaping. 
        For example, JSX would escape characters meaningful in CSS such as ', ", < and >, thus breaking the CSS. 
    Q: Why not use a sanitization library such as DOMPurify?
    A: For our use case, we specifically want to purify CSS text, *not* HTML. 
        DOMPurify, as well as any other HTML sanitization library, would escape/encode meaningful CSS characters 
        and break our CSS in the same way that JSX would. 

    Q: Are there any security risks in this particular use case?
    A: Anything set inside of a <style> tag is always interpreted as CSS text, *not* HTML.
        Reference: “Restrictions on the content of raw text elements” https://html.spec.whatwg.org/dev/syntax.html#cdata-rcdata-restrictions
        And in our case, we are using dangerouslySetInnerHTML to set CSS text inside of a <style> tag. 
            
        Thus, it really comes down to the question: Could a malicious user escape from the context of the <style> tag? 
        For example, when inserting HTML into the DOM, could someone prematurely close the </style> tag and add a <script> tag?
          e.g., </style><script>alert('hello')</script>
        The answer depends on whether the code is rendered on the client or server side. 

        Client side
        - To prevent XSS inside of the <style> tag, we need to make sure it's not closed prematurely. 
        - This is prevented by React because React creates a style DOM node (e.g., React.createElement(‘style’, ...)), and directly sets innerHTML as a string. 
        - Even if the string contains a closing </style> tag, it will still be interpreted as CSS text by the browser. 
        - Therefore, there is not an XSS vulnerability on the client side. 

        Server side
        - When React code is rendered on the server side (e.g., NextJS), the code is sent to the browser as HTML text. 
        - Therefore, it *IS* possible to insert a closing </style> tag and escape the CSS context, which opens an XSS vulnerability. 

    Q: How are we mitigating the potential attack vector?
    A: To fix this potential attack vector on the server side, we need to filter out any closing </style> tags, 
        as this the only way to escape from the context of the browser interpreting the text as CSS. 
        We also need to catch cases where there is any kind of whitespace character </style[HERE]>, such as tabs, carriage returns, etc:
        </style
        
        >
        Therefore, by only rendering CSS text which does not include a closing '</style>' tag, 
        we ensure that the browser will correctly interpret all the text as CSS. 
  */
  if (/<\/style/i.test(cssText)) {
    return null;
  } else {
    return (
      <style
        {...rest}
        ref={ref}
        id={`amplify-theme-${name}`}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: cssText }}
        nonce={nonce}
      />
    );
  }
};

/**
 * @experimental
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/theme)
 */
export const ThemeStyle: ForwardRefPrimitive<BaseStyleThemeProps, 'style'> =
  primitiveWithForwardRef(ThemeStylePrimitive);

ThemeStyle.displayName = 'ThemeStyle';
