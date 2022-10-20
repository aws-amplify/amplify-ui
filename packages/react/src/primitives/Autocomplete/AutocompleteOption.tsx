import classNames from 'classnames';
import * as React from 'react';

import { View } from '../View';
import { ComponentClassNames } from '../shared/constants';
import { classNameModifierByFlag } from '../shared/utils';
import type { Primitive, AutocompleteOptionProps } from '../types';

export const AutocompleteOption: Primitive<AutocompleteOptionProps, 'li'> = ({
  children,
  className,
  isActive,
  ...rest
}) => {
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
      {...rest}
    >
      {children}
    </View>
  );
};

AutocompleteOption.displayName = 'AutocompleteOption';
