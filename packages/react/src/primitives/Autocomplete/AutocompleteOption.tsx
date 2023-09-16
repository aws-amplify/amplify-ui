import classNames from 'classnames';
import * as React from 'react';

import { ComponentClassName } from '@aws-amplify/ui';

import { View } from '../View';
import { classNameModifierByFlag } from '../shared/utils';
import type {
  ForwardRefPrimitive,
  Primitive,
  AutocompleteOptionProps,
  BaseAutocompleteOptionProps,
} from '../types';

const AutocompleteOptionPrimitive: Primitive<AutocompleteOptionProps, 'li'> = (
  { children, className, isActive, ...rest },
  ref
) => {
  return (
    <View
      aria-selected={isActive}
      as="li"
      role="option"
      className={classNames(
        ComponentClassName.AutocompleteMenuOption,
        classNameModifierByFlag(
          ComponentClassName.AutocompleteMenuOption,
          'active',
          isActive
        ),
        className
      )}
      ref={ref}
      {...rest}
    >
      {children}
    </View>
  );
};

export const AutocompleteOption: ForwardRefPrimitive<
  BaseAutocompleteOptionProps,
  'li'
> = React.forwardRef(AutocompleteOptionPrimitive);

AutocompleteOption.displayName = 'AutocompleteOption';
