import classNames from 'classnames';
import {
  AccordionSingleProps,
  AccordionMultipleProps,
  Root,
} from '@radix-ui/react-accordion';
import * as React from 'react';

import { View } from '../View';
import { Primitive } from '../types/view';
import { ExpanderProps } from '../types/expander';
import { ComponentClassNames } from '../shared/constants';
import { splitPrimitiveProps } from '../shared/styleUtils';

// Have to add `{ collapsible: boolean }` to get around type errors
// otherwise this prop will be swallowed
type RootProps =
  | React.ForwardRefExoticComponent<
      AccordionSingleProps & React.RefAttributes<HTMLDivElement>
    >
  | React.ForwardRefExoticComponent<
      AccordionMultipleProps & {
        collapsible: never;
      } & React.RefAttributes<HTMLDivElement>
    >;

export const Expander: Primitive<ExpanderProps, RootProps> = ({
  children,
  className,
  isCollapsible,
  onChange,
  type,
  ..._rest
}) => {
  const { baseStyleProps, rest } = splitPrimitiveProps(_rest);

  const expander =
    type === 'multiple' ? (
      <View
        as={Root}
        className={classNames(ComponentClassNames.Expander, className)}
        onValueChange={onChange}
        type={type}
        {...baseStyleProps}
        {...rest}
      >
        {children}
      </View>
    ) : (
      <View
        as={Root}
        className={classNames(ComponentClassNames.Expander, className)}
        collapsible={isCollapsible}
        onValueChange={onChange}
        type={type}
        {...baseStyleProps}
        {...rest}
      >
        {children}
      </View>
    );

  return expander;
};
