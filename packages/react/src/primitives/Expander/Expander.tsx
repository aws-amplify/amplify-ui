import * as React from 'react';
import { Root } from '@radix-ui/react-accordion';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { ExpanderProps } from '../types/expander';
import { Primitive } from '../types/view';
import { splitPrimitiveProps } from '../shared/styleUtils';

const ExpanderPrimitive: Primitive<ExpanderProps, typeof Root> = (
  {
    children,
    className,
    defaultValue,
    isCollapsible,
    onChange,
    // It is not in use but remove it from rest to avoid type errors
    onValueChange,
    testId,
    type = 'single',
    value,
    ..._rest
  },
  ref
) => {
  // Throw away baseStyleProps and flexContainerStyleProps since they won't work on Root element
  const { rest } = splitPrimitiveProps(_rest);

  const expander =
    type === 'multiple' ? (
      <Root
        className={classNames(ComponentClassNames.Expander, className)}
        data-testid={testId}
        defaultValue={defaultValue as string[]}
        onValueChange={onChange}
        ref={ref}
        type={type}
        value={value as string[]}
        {...rest}
      >
        {children}
      </Root>
    ) : (
      <Root
        className={classNames(ComponentClassNames.Expander, className)}
        collapsible={isCollapsible}
        data-testid={testId}
        defaultValue={defaultValue as string}
        onValueChange={onChange}
        ref={ref}
        type={type}
        value={value as string}
        {...rest}
      >
        {children}
      </Root>
    );

  return expander;
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/expander)
 */
export const Expander = React.forwardRef(ExpanderPrimitive);

Expander.displayName = 'Expander';
