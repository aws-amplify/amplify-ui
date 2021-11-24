import classNames from 'classnames';
import { Root } from '@radix-ui/react-accordion';
import * as React from 'react';

import { PrimitiveWithForwardRef } from '../types/view';
import { ExpanderProps } from '../types/expander';
import { ComponentClassNames } from '../shared/constants';
import { splitPrimitiveProps } from '../shared/styleUtils';

const ExpanderPrimitive: PrimitiveWithForwardRef<ExpanderProps, typeof Root> = (
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

export const Expander = React.forwardRef(ExpanderPrimitive);

Expander.displayName = 'Expander';
