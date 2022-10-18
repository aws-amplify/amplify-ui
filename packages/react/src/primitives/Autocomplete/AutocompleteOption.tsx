import classNames from 'classnames';
import * as React from 'react';

import { View } from '../View';
import { ComponentClassNames } from '../shared/constants';
import type { Primitive, AutocompleteOptionProps } from '../types';

export const AutocompleteOption: Primitive<AutocompleteOptionProps, 'li'> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <View
      as="li"
      role="option"
      className={classNames(
        ComponentClassNames.AutocompleteMenuOption,
        className
      )}
      {...rest}
    >
      {children}
    </View>
  );
};

AutocompleteOption.displayName = 'AutocompleteOption';
