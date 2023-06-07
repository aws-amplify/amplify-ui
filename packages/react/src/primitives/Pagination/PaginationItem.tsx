import * as React from 'react';
import classNames from 'classnames';

import { Button } from '../Button';
import { Flex } from '../Flex';
import { IconChevronLeft, IconChevronRight } from '../Icon/internal';
import { View } from '../View';
import { VisuallyHidden } from '../VisuallyHidden';
import { BasePaginationItemProps } from '../types/pagination';
import { ComponentClassNames, ComponentText } from '../shared/constants';
import { classNameModifier, classNameModifierByFlag } from '../shared/utils';

export const PAGINATION_CURRENT_TEST_ID = 'current';
export const PAGINATION_ELLIPSIS_TEST_ID = 'ellipsis';

export const PaginationItem: React.FC<BasePaginationItemProps> = ({
  type,
  page,
  currentPage,
  currentPageLabel = ComponentText.PaginationItem.currentPageLabel,
  isDisabled,
  onClick,
  ariaLabel,
  ...rest
}) => {
  const nextClasses = classNames(
    ComponentClassNames.PaginationItemButton,
    classNameModifier(ComponentClassNames.PaginationItemButton, 'link'),
    classNameModifierByFlag(
      ComponentClassNames.PaginationItemButton,
      'disabled',
      isDisabled
    )
  );
  const previousClasses = classNames(
    ComponentClassNames.PaginationItemButton,
    classNameModifier(ComponentClassNames.PaginationItemButton, 'link'),
    classNameModifierByFlag(
      ComponentClassNames.PaginationItemButton,
      'disabled',
      isDisabled
    )
  );

  switch (type) {
    case 'page':
      return (
        <View as="li">
          {page === currentPage ? (
            <Flex
              aria-current="page"
              as="button"
              className={ComponentClassNames.PaginationItemCurrent}
              testId={PAGINATION_CURRENT_TEST_ID}
              {...rest}
            >
              <VisuallyHidden>{currentPageLabel}:</VisuallyHidden>
              {page}
            </Flex>
          ) : (
            <Button
              className={classNames(
                ComponentClassNames.PaginationItemButton,
                classNameModifier(
                  ComponentClassNames.PaginationItemButton,
                  'link'
                )
              )}
              size="small"
              variation="link"
              onClick={() => {
                onClick?.();
              }}
              ariaLabel={ariaLabel}
              {...rest}
            >
              {page}
            </Button>
          )}
        </View>
      );
    case 'next':
      return (
        <View as="li">
          <Button
            className={nextClasses}
            size="small"
            variation="link"
            isDisabled={isDisabled}
            onClick={() => {
              onClick?.();
            }}
            ariaLabel={ariaLabel}
            {...rest}
          >
            <IconChevronRight size="large" />
          </Button>
        </View>
      );
    case 'previous':
      return (
        <View as="li">
          <Button
            className={previousClasses}
            size="small"
            variation="link"
            isDisabled={isDisabled}
            onClick={() => {
              onClick?.();
            }}
            ariaLabel={ariaLabel}
            {...rest}
          >
            <IconChevronLeft size="large" />
          </Button>
        </View>
      );
    case 'ellipsis':
      return (
        <View as="li">
          <Flex
            as="span"
            className={ComponentClassNames.PaginationItemEllipsis}
            testId={PAGINATION_ELLIPSIS_TEST_ID}
            {...rest}
          >
            &#8230;
          </Flex>
        </View>
      );
    default:
    // No match type found
  }
  return <View as="li" />;
};

PaginationItem.displayName = 'PaginationItem';
