import * as React from 'react';

import { HighlightMatch } from '../HighlightMatch/HighlightMatch';
import { Loader } from '../Loader';
import { AutocompleteOption } from './AutocompleteOption';
import { ScrollView } from '../ScrollView';
import { View } from '../View';
import { ComponentClassNames } from '../shared/constants';
import { ComponentText } from '../shared/constants';
import { isFunction } from '../shared/utils';
import type { Primitive, AutocompleteMenuProps, Option } from '../types';

export const AutocompleteMenu: Primitive<AutocompleteMenuProps, 'div'> = ({
  activeIdx,
  activeOptionId,
  ariaLabel,
  Header = null,
  Footer = null,
  Loading = null,
  Empty = null,
  isControlled,
  isCustomFiltering = false,
  isLoading,
  isOpen,
  listboxId,
  onSelect,
  optionBaseId,
  options = [],
  renderOption,
  setActiveIdx,
  setIsOpen,
  setValue,
  value,
  ...rest
}) => {
  const MenuHeader = React.useCallback(() => {
    return (
      Header && (
        <View className={ComponentClassNames.AutocompleteMenuHeader}>
          {Header}
        </View>
      )
    );
  }, [Header]);

  const MenuFooter = React.useCallback(() => {
    return (
      Footer && (
        <View className={ComponentClassNames.AutocompleteMenuFooter}>
          {Footer}
        </View>
      )
    );
  }, [Footer]);

  const MenuLoading = React.useCallback(
    () =>
      Loading ? (
        <View className={ComponentClassNames.AutocompleteMenuLoading}>
          {Loading}
        </View>
      ) : (
        <View className={ComponentClassNames.AutocompleteMenuLoading}>
          <Loader />
          {ComponentText.Autocomplete.loadingText}
        </View>
      ),
    [Loading]
  );

  const MenuEmpty = React.useCallback(
    () =>
      Empty ? (
        <View className={ComponentClassNames.AutocompleteMenuEmpty}>
          {Empty}
        </View>
      ) : (
        <View className={ComponentClassNames.AutocompleteMenuEmpty}>
          {ComponentText.Autocomplete.emptyText}
        </View>
      ),
    [Empty]
  );

  const Options = React.useMemo(
    () =>
      options.map((option: Option, idx) => {
        const { id, label, ...rest } = option;
        const isActive = activeIdx === idx;

        const handleOnClick: React.MouseEventHandler<HTMLLIElement> = () => {
          setIsOpen(false);
          setActiveIdx(-1);
          if (!isControlled) {
            setValue(label);
          }
          if (isFunction(onSelect)) {
            onSelect(option);
          }
        };

        const handleOnMouseDown: React.MouseEventHandler<HTMLLIElement> = (
          event
        ) => {
          event.preventDefault();
        };

        const handleOnMouseMove: React.MouseEventHandler<HTMLLIElement> =
          () => {
            setActiveIdx(idx);
          };

        const optionId = `${optionBaseId}-option-${idx}`;

        return (
          <AutocompleteOption
            isActive={isActive}
            id={id || optionId}
            key={id || optionId}
            onClick={handleOnClick}
            onMouseDown={handleOnMouseDown}
            onMouseMove={handleOnMouseMove}
            {...rest}
          >
            {isFunction(renderOption) ? (
              renderOption(option, value)
            ) : isCustomFiltering ? (
              label
            ) : (
              <HighlightMatch query={value}>{label}</HighlightMatch>
            )}
          </AutocompleteOption>
        );
      }),
    [
      activeIdx,
      isControlled,
      isCustomFiltering,
      onSelect,
      optionBaseId,
      options,
      renderOption,
      setActiveIdx,
      setValue,
      setIsOpen,
      value,
    ]
  );

  return (
    <ScrollView className={ComponentClassNames.AutocompleteMenu} {...rest}>
      {isLoading ? (
        <MenuLoading />
      ) : (
        <>
          <MenuHeader />
          {Options.length > 0 ? (
            <ScrollView
              as="ul"
              ariaLabel={ariaLabel}
              className={ComponentClassNames.AutocompleteMenuOptions}
              id={listboxId}
              role="listbox"
            >
              {Options}
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

AutocompleteMenu.displayName = 'AutocompleteMenu';
