import * as React from 'react';

import { Flex } from '../Flex';
import { HighlightMatch } from './HighlightMatch';
import { Loader } from '../Loader';
import { AutocompleteOption } from './AutocompleteOption';
import { ScrollView } from '../ScrollView';
import { View } from '../View';
import { ComponentClassNames } from '../shared/constants';
import { useStableId } from '../utils/useStableId';
import { classNameModifierByFlag, isFunction } from '../shared/utils';
import type { Primitive, AutocompleteMenuProps, Option } from '../types';

const defaultMenu = {
  ariaLabel: undefined,
  Header: null,
  Footer: null,
  Loading: null,
  Empty: null,
};

export const AutocompleteMenu: Primitive<AutocompleteMenuProps, 'div'> = ({
  activeIdx,
  activeOptionId,
  filteringType,
  isControlled,
  isLoading,
  isOpen,
  listboxId,
  menu = defaultMenu,
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
  const menuId = useStableId();
  const { ariaLabel, Header, Footer, Loading, Empty } = menu;

  const OptionMenuHeader = React.useCallback(() => {
    return (
      Header && (
        <Flex className={ComponentClassNames.AutocompleteMenuHeader}>
          {Header}
        </Flex>
      )
    );
  }, [Header]);

  const OptionMenuFooter = React.useCallback(() => {
    return (
      Footer && (
        <Flex className={ComponentClassNames.AutocompleteMenuFooter}>
          {Footer}
        </Flex>
      )
    );
  }, [Footer]);

  const OptionMenuLoading = React.useCallback(
    () =>
      Loading ? (
        <Flex>{Loading}</Flex>
      ) : (
        <Flex className={ComponentClassNames.AutocompleteMenuLoading}>
          <Loader />
          Loading options...
        </Flex>
      ),
    [Loading]
  );

  const NoOptions = React.useCallback(
    () =>
      Empty ? (
        <Flex className={ComponentClassNames.AutocompleteMenuEmpty}>
          {Empty}
        </Flex>
      ) : (
        <Flex className={ComponentClassNames.AutocompleteMenuEmpty}>
          No options found
        </Flex>
      ),
    [Empty]
  );

  const Options = React.useMemo(
    () =>
      options.map((option: Option, idx) => {
        const { id, label } = option;
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
            aria-selected={isActive}
            className={classNameModifierByFlag(
              ComponentClassNames.AutocompleteMenuOption,
              'active',
              isActive
            )}
            id={id || optionId}
            key={id || optionId}
            onClick={handleOnClick}
            onMouseDown={handleOnMouseDown}
            onMouseMove={handleOnMouseMove}
          >
            {isFunction(renderOption) ? (
              renderOption(option, value)
            ) : filteringType !== 'manual' ? (
              <HighlightMatch query={value}>{label}</HighlightMatch>
            ) : (
              label
            )}
          </AutocompleteOption>
        );
      }),
    [
      activeIdx,
      filteringType,
      isControlled,
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

  React.useEffect(() => {
    const menuElement = document.getElementById(menuId);
    if (menuElement) {
      const { top, bottom } = menuElement.getBoundingClientRect();

      if (top < 0 || bottom > document.documentElement.clientHeight) {
        window.scrollTo({
          top:
            bottom -
            document.documentElement.clientHeight +
            window.scrollY +
            20,
          behavior: 'smooth',
        });
      }
    }
  }, [menuId]);

  React.useEffect(() => {
    const listboxElement = document.getElementById(listboxId);
    const activeOptionElement = document.getElementById(activeOptionId);

    if (activeOptionElement && listboxElement) {
      const { scrollTop, clientHeight } = listboxElement;
      const { offsetHeight, offsetTop } = activeOptionElement;
      const { top, bottom } = activeOptionElement.getBoundingClientRect();

      if (scrollTop > offsetTop) {
        listboxElement.scrollTop = offsetTop;
      }

      if (scrollTop + clientHeight < offsetTop + offsetHeight) {
        listboxElement.scrollTop = offsetTop + offsetHeight - clientHeight;
      }

      if (top < 0 || bottom > document.documentElement.clientHeight) {
        activeOptionElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    }
  }, [activeOptionId, listboxId]);

  return (
    <View
      className={ComponentClassNames.AutocompleteMenu}
      id={menuId}
      {...rest}
    >
      {isLoading ? (
        <OptionMenuLoading />
      ) : (
        <>
          <OptionMenuHeader />
          {options.length > 0 ? (
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
            <NoOptions />
          )}
          <OptionMenuFooter />
        </>
      )}
    </View>
  );
};

AutocompleteMenu.displayName = 'AutocompleteMenu';
