import * as React from 'react';

import { Button } from '../Button';
import { Flex } from '../Flex';
import { IconChevronLeft, IconChevronRight } from '../Icon';
import { View } from '../View';
import { VisuallyHidden } from '../VisuallyHidden';
import { PaginationItemProps } from '../types/pagination';
import { ComponentClassNames } from '../shared/constants';

export const PAGINATION_CURRENT_TEST_ID = 'current';
export const PAGINATION_ELLIPSIS_TEST_ID = 'ellipsis';

export const PaginationItem: React.FC<PaginationItemProps> = ({
  type,
  page,
  currentPage,
  isDisabled,
  onClick,
  ariaLabel,
  ...rest
}) => {
  const onChange = React.useCallback(() => {
    onClick(page, currentPage);
  }, [page, currentPage, onClick]);

  const onPrevious = React.useCallback(() => {
    onClick();
  }, [onClick]);

  const onNext = React.useCallback(() => {
    onClick();
  }, [onClick]);

  switch (type) {
    case 'page':
      return (
        <View as="li">
          {page === currentPage ? (
            <Flex
              as="span"
              className={ComponentClassNames.PaginationItemCurrent}
              testId={PAGINATION_CURRENT_TEST_ID}
              {...rest}
            >
              {/**
               * Use markup to indicate the current item of a menu, such as the current page on a website, to improve orientation in the menu.
               * @link https://www.w3.org/WAI/tutorials/menus/structure/#indicate-the-current-item
               */}
              <VisuallyHidden>Current Page:</VisuallyHidden>
              {page}
            </Flex>
          ) : (
            <Button
              className={ComponentClassNames.PaginationItemButton}
              size="small"
              variation="link"
              onClick={onChange}
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
            className={ComponentClassNames.PaginationItemButton}
            size="small"
            variation="link"
            isDisabled={isDisabled}
            onClick={onNext}
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
            className={ComponentClassNames.PaginationItemButton}
            size="small"
            variation="link"
            isDisabled={isDisabled}
            onClick={onPrevious}
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
