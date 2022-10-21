import * as React from 'react';

import { Flex } from '../Flex';
import { HighlightMatch } from './HighlightMatch';
import { Loader } from '../Loader';
import { AutocompleteOption } from './AutocompleteOption';
import { ScrollView } from '../ScrollView';
import { View } from '../View';
import { ComponentClassNames } from '../shared/constants';
import { isFunction } from '../shared/utils';
import type { Primitive, AutocompleteMenuProps, Option } from '../types';

export const EMPTY_TEXT = 'No options found';
export const LOADING_TEXT = 'Loading options...';

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
        <Flex className={ComponentClassNames.AutocompleteMenuHeader}>
          {Header}
        </Flex>
      )
    );
  }, [Header]);

  const MenuFooter = React.useCallback(() => {
    return (
      Footer && (
        <Flex className={ComponentClassNames.AutocompleteMenuFooter}>
          {Footer}
        </Flex>
      )
    );
  }, [Footer]);

  const MenuLoading = React.useCallback(
    () =>
      Loading ? (
        <Flex className={ComponentClassNames.AutocompleteMenuLoading}>
          {Loading}
        </Flex>
      ) : (
        <Flex className={ComponentClassNames.AutocompleteMenuLoading}>
          <Loader />
          {LOADING_TEXT}
        </Flex>
      ),
    [Loading]
  );

  const MenuEmpty = React.useCallback(
    () =>
      Empty ? (
        <Flex className={ComponentClassNames.AutocompleteMenuEmpty}>
          {Empty}
        </Flex>
      ) : (
        <Flex className={ComponentClassNames.AutocompleteMenuEmpty}>
          {EMPTY_TEXT}
        </Flex>
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
    <View className={ComponentClassNames.AutocompleteMenu} {...rest}>
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
    </View>
  );
};

AutocompleteMenu.displayName = 'AutocompleteMenu';
