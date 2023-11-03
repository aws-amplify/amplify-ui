import * as React from 'react';
import { ComponentClassName } from '@aws-amplify/ui';
import { Loader } from '../Loader';

import { ScrollView } from '../ScrollView';
import { View } from '../View';

import { ComponentText } from '../shared/constants';
import type {
  ForwardRefPrimitive,
  Primitive,
  AutocompleteMenuProps,
  BaseAutocompleteMenuProps,
} from '../types';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

const MenuHeader = ({ children }: { children?: React.ReactNode }) => {
  if (!children) {
    return null;
  }
  return (
    <View className={ComponentClassName.AutocompleteMenuHeader}>
      {children}
    </View>
  );
};

const MenuFooter = ({ children }: { children?: React.ReactNode }) => {
  if (!children) {
    return null;
  }
  return (
    <View className={ComponentClassName.AutocompleteMenuFooter}>
      {children}
    </View>
  );
};

const MenuLoading = ({ children }: { children?: React.ReactNode }) => {
  return (
    <View className={ComponentClassName.AutocompleteMenuLoading}>
      {children ?? (
        <>
          <Loader />
          {ComponentText.Autocomplete.loadingText}
        </>
      )}
    </View>
  );
};

const MenuEmpty = ({ children }: { children?: React.ReactNode }) => (
  <View className={ComponentClassName.AutocompleteMenuEmpty}>
    {children ?? ComponentText.Autocomplete.emptyText}
  </View>
);

const AutocompleteMenuPrimitive: Primitive<AutocompleteMenuProps, 'div'> = (
  {
    ariaLabel,
    children,
    Header = null,
    Footer = null,
    LoadingIndicator = null,
    Empty = null,
    isLoading,
    listboxId,
    ...rest
  },
  ref
) => {
  return (
    <ScrollView
      className={ComponentClassName.AutocompleteMenu}
      ref={ref}
      {...rest}
    >
      {isLoading ? (
        <MenuLoading>{LoadingIndicator}</MenuLoading>
      ) : (
        <>
          <MenuHeader>{Header}</MenuHeader>
          {children.length > 0 ? (
            <ScrollView
              as="ul"
              ariaLabel={ariaLabel}
              className={ComponentClassName.AutocompleteMenuOptions}
              id={listboxId}
              role="listbox"
            >
              {children}
            </ScrollView>
          ) : (
            <MenuEmpty>{Empty}</MenuEmpty>
          )}
          <MenuFooter>{Footer}</MenuFooter>
        </>
      )}
    </ScrollView>
  );
};

export const AutocompleteMenu: ForwardRefPrimitive<
  BaseAutocompleteMenuProps,
  'div'
> = primitiveWithForwardRef(AutocompleteMenuPrimitive);

AutocompleteMenu.displayName = 'AutocompleteMenu';
