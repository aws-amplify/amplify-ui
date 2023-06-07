import * as React from 'react';

import { Loader } from '../Loader';

import { ScrollView } from '../ScrollView';
import { View } from '../View';
import { ComponentClassNames } from '../shared/constants';
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
        <View className={ComponentClassNames.AutocompleteMenuHeader}>
          {Header}
        </View>
      )
    );
  };

  const MenuFooter = () => {
    return (
      Footer && (
        <View className={ComponentClassNames.AutocompleteMenuFooter}>
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
      <View className={ComponentClassNames.AutocompleteMenuLoading}>
        {MenuLoadingBody}
      </View>
    );
  };

  const MenuEmpty = () =>
    Empty ? (
      <View className={ComponentClassNames.AutocompleteMenuEmpty}>{Empty}</View>
    ) : (
      <View className={ComponentClassNames.AutocompleteMenuEmpty}>
        {ComponentText.Autocomplete.emptyText}
      </View>
    );

  return (
    <ScrollView
      className={ComponentClassNames.AutocompleteMenu}
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
              className={ComponentClassNames.AutocompleteMenuOptions}
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
