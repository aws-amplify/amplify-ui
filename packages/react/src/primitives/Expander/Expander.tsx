import * as React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import classNames from 'classnames';

import { sanitizeNamespaceImport } from '@aws-amplify/ui';

import { useDeprecationWarning } from '../../hooks/useDeprecationWarning';
import { ComponentClassNames } from '../shared/constants';
import { BaseExpanderProps, ExpanderProps } from '../types/expander';
import { ForwardRefPrimitive, Primitive } from '../types/view';
import { splitPrimitiveProps } from '../utils/splitPrimitiveProps';

// Radix packages don't support ESM in Node, in some scenarios(e.g. SSR)
// We have to use namespace import and sanitize it to ensure the interoperablity between ESM and CJS
const { Root } = sanitizeNamespaceImport(Accordion);

const ExpanderPrimitive: Primitive<ExpanderProps, 'div'> = (
  {
    children,
    className,
    defaultValue,
    isCollapsible,
    onChange,
    onValueChange,
    testId,
    type = 'single',
    value,
    ..._rest
  },
  ref
) => {
  // Throw away style props since they won't work on Root element
  const { rest } = splitPrimitiveProps(_rest);

  const handleValueChange = onValueChange ?? onChange;

  useDeprecationWarning({
    shouldWarn: !!onChange,
    message:
      'Expander `onChange` prop will be deprecated in the next major release of @aws-amplify/ui-react. Please replace usage with `onValueChange`.',
  });

  const expander =
    type === 'multiple' ? (
      <Root
        className={classNames(ComponentClassNames.Expander, className)}
        data-testid={testId}
        defaultValue={defaultValue as string[]}
        onValueChange={handleValueChange as (value?: string[]) => void}
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
        onValueChange={handleValueChange as (value?: string) => void}
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
export const Expander: ForwardRefPrimitive<BaseExpanderProps, 'div'> =
  React.forwardRef(ExpanderPrimitive);

Expander.displayName = 'Expander';
