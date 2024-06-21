import * as React from 'react';
import { autocompleteClasses } from '@aws-amplify/ui';

import { View } from '../View';
import type {
  ForwardRefPrimitive,
  Primitive,
  AutocompleteOptionProps,
  BaseAutocompleteOptionProps,
} from '../types';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

const AutocompleteOptionPrimitive: Primitive<AutocompleteOptionProps, 'li'> = (
  { children, className, isActive, ...rest },
  ref
) => {
  return (
    <View
      aria-selected={isActive}
      as="li"
      role="option"
      className={autocompleteClasses(
        { _element: { menu__option: isActive ? 'active' : undefined } },
        [className]
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
> = primitiveWithForwardRef(AutocompleteOptionPrimitive);

AutocompleteOption.displayName = 'AutocompleteOption';
