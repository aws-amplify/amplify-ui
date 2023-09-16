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
  const MenuHeader = () => {
    return (
      Header && (
        <View className={ComponentClassName.AutocompleteMenuHeader}>
          {Header}
        </View>
      )
    );
  };

  const MenuFooter = () => {
    return (
      Footer && (
        <View className={ComponentClassName.AutocompleteMenuFooter}>
          {Footer}
        </View>
      )
    );
  };

  const MenuLoading = () => {
    const MenuLoadingBody = LoadingIndicator ?? (
      <>
        <Loader />
        {ComponentText.Autocomplete.loadingText}
      </>
    );

    return (
      <View className={ComponentClassName.AutocompleteMenuLoading}>
        {MenuLoadingBody}
      </View>
    );
  };

  const MenuEmpty = () =>
    Empty ? (
      <View className={ComponentClassName.AutocompleteMenuEmpty}>{Empty}</View>
    ) : (
      <View className={ComponentClassName.AutocompleteMenuEmpty}>
        {ComponentText.Autocomplete.emptyText}
      </View>
    );

  return (
    <ScrollView
      className={ComponentClassName.AutocompleteMenu}
      ref={ref}
      {...rest}
    >
      {isLoading ? (
        <MenuLoading />
      ) : (
        <>
          <MenuHeader />
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
            <MenuEmpty />
          )}
          <MenuFooter />
        </>
      )}
    </ScrollView>
  );
};

export const AutocompleteMenu: ForwardRefPrimitive<
  BaseAutocompleteMenuProps,
  'div'
> = React.forwardRef(AutocompleteMenuPrimitive);

AutocompleteMenu.displayName = 'AutocompleteMenu';
