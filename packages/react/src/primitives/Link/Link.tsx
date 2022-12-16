import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared';
import { ForwardRefPrimitive, LinkProps, Primitive } from '../types';
import { View } from '../View';
import { useDeprecationWarning } from '../../hooks/useDeprecationWarning';

const LinkPrimitive: Primitive<LinkProps, 'a'> = (props, ref) => {
  const { as = 'a', children, className, isExternal, ...rest } = props;

  useDeprecationWarning({
    shouldWarn: props.to != null,
    message:
      "The Link component's to prop will soon be deprecated. " +
      'Please see the Amplify UI documentation for using the Link component with routing libraries: ' +
      'https://ui.docs.amplify.aws/react/components/link#routing-libraries',
  });

  return (
    <View
      as={as}
      className={classNames(ComponentClassNames.Link, className)}
      ref={ref}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      target={isExternal ? '_blank' : undefined}
      {...rest}
    >
      {children}
    </View>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/link)
 */
export const Link: ForwardRefPrimitive<LinkProps, 'a'> =
  React.forwardRef(LinkPrimitive);

Link.displayName = 'Link';
