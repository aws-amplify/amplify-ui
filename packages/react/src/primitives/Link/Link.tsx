import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared';
import { LinkProps, Primitive } from '../types';
import { View } from '../View';
import { useDeprecationWarning } from '../../hooks/useDeprecationWarning';

const LinkPrimitive: Primitive<LinkProps, 'a'> = (
  { as, children, className, isExternal, to, ...rest },
  ref
) => {
  useDeprecationWarning({
    shouldWarn: to != null && !as,
    message:
      "The Link component's to prop will soon be deprecated. " +
      'Please see the Amplify UI documentation for using the Link component with routing libraries: ' +
      'https://ui.docs.amplify.aws/react/components/link#routing-libraries',
  });
  return (
    <View
      as={as ? as : 'a'}
      className={classNames(ComponentClassNames.Link, className)}
      ref={ref}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      target={isExternal ? '_blank' : undefined}
      to={to}
      {...rest}
    >
      {children}
    </View>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/link)
 */
export const Link = React.forwardRef(LinkPrimitive);

Link.displayName = 'Link';
