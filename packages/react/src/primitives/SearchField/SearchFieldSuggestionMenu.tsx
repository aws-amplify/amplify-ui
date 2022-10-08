import * as React from 'react';

import { Flex } from '../Flex';
import { HighlightMatch } from './HighlightMatch';
import { Loader } from '../Loader';
import { SearchFieldSuggestion } from './SearchFieldSuggestion';
import { ScrollView } from '../ScrollView';
import { ComponentClassNames } from '../shared/constants';
import { useStableId } from '../utils/useStableId';
import { classNameModifierByFlag, isFunction } from '../shared/utils';
import type {
  Primitive,
  SearchFieldSuggestionMenuProps,
  Suggestion,
} from '../types';

const defaultSuggestionMenu = {
  ariaLabel: undefined,
  Header: null,
  Footer: null,
  Loading: null,
  Empty: null,
};

export const SearchFieldSuggestionMenu: Primitive<
  SearchFieldSuggestionMenuProps,
  'div'
> = ({
  activeIdx,
  activeSuggestionId,
  filteringType,
  id,
  isControlled,
  isLoading,
  isOpen,
  onSuggestionSelect,
  renderSuggestion,
  setActiveIdx,
  setIsMenuOpen,
  setInternalValue,
  suggestionBaseId,
  suggestions = [],
  suggestionMenu = defaultSuggestionMenu,
  value,
  ...rest
}) => {
  const menuContainerId = useStableId();
  const { Header, Footer, Loading, Empty, ariaLabel } = suggestionMenu;

  const SuggestionMenuHeader = () => {
    return (
      Header && (
        <Flex className={ComponentClassNames.SearchFieldMenuHeader}>
          {Header}
        </Flex>
      )
    );
  };

  const SuggestionMenuFooter = () => {
    return (
      Footer && (
        <Flex className={ComponentClassNames.SearchFieldMenuFooter}>
          {Footer}
        </Flex>
      )
    );
  };

  const SuggestionMenuLoading = () =>
    Loading ? (
      <Flex>{Loading}</Flex>
    ) : (
      <Flex className={ComponentClassNames.SearchFieldMenuLoading}>
        <Loader />
        Loading suggestions...
      </Flex>
    );

  const NoSuggestions = () =>
    Empty ? (
      <Flex className={ComponentClassNames.SearchFieldMenuEmpty}>{Empty}</Flex>
    ) : (
      <Flex className={ComponentClassNames.SearchFieldMenuEmpty}>
        No suggestions found
      </Flex>
    );

  const Suggestions = () => {
    return suggestions.length > 0 ? (
      <ScrollView
        as="ul"
        role="listbox"
        ariaLabel={ariaLabel}
        className={ComponentClassNames.SearchFieldMenuSuggestions}
        id={id}
      >
        {suggestions.map((suggestion: Suggestion, idx) => {
          const { id, label } = suggestion;
          const isActive = activeIdx === idx;

          const handleOnClick: React.MouseEventHandler<HTMLLIElement> = () => {
            setIsMenuOpen(false);
            setActiveIdx(-1);
            if (!isControlled) {
              setInternalValue(label);
            }
            if (isFunction(onSuggestionSelect)) {
              onSuggestionSelect(suggestion);
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

          const suggestionId = `${suggestionBaseId}-suggestion-${idx}`;

          return (
            <SearchFieldSuggestion
              aria-selected={isActive}
              className={classNameModifierByFlag(
                ComponentClassNames.SearchFieldMenuSuggestion,
                'active',
                isActive
              )}
              id={id || suggestionId}
              key={id || suggestionId}
              onClick={handleOnClick}
              onMouseDown={handleOnMouseDown}
              onMouseMove={handleOnMouseMove}
            >
              {isFunction(renderSuggestion) ? (
                renderSuggestion(suggestion, value)
              ) : filteringType !== 'manual' ? (
                <HighlightMatch query={value}>{label}</HighlightMatch>
              ) : (
                label
              )}
            </SearchFieldSuggestion>
          );
        })}
      </ScrollView>
    ) : (
      <NoSuggestions />
    );
  };

  React.useEffect(() => {
    const menuContainerElement = document.getElementById(menuContainerId);
    if (menuContainerElement && isOpen) {
      const { top, bottom, height } =
        menuContainerElement.getBoundingClientRect();

      if (top < 0 || bottom > document.documentElement.clientHeight) {
        window.scrollTo({
          top: document.documentElement.clientHeight - height + 50,
        });
      }
    }

    const activeSuggestionElement = document.getElementById(activeSuggestionId);
    if (activeSuggestionElement) {
      activeSuggestionElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [activeSuggestionId, isOpen, menuContainerId, suggestionBaseId]);

  return (
    <ScrollView
      className={ComponentClassNames.SearchFieldMenu}
      id={menuContainerId}
      {...rest}
    >
      {isLoading ? (
        <SuggestionMenuLoading />
      ) : (
        <>
          <SuggestionMenuHeader />
          <Suggestions />
          <SuggestionMenuFooter />
        </>
      )}
    </ScrollView>
  );
};
