import classNames from 'classnames';
import * as React from 'react';

import { View } from '../View';
import { ComponentClassNames } from '../shared/constants';
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
        ComponentClassNames.AutocompleteMenuOption,
        classNameModifierByFlag(
          ComponentClassNames.AutocompleteMenuOption,
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
