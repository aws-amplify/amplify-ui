import * as React from 'react';
import { classNames } from '@aws-amplify/ui';

import { ComponentClassName } from '@aws-amplify/ui';

import { Button } from '../Button';
import { Flex } from '../Flex';
import { IconChevronLeft, IconChevronRight, useIcons } from '../Icon';
import { View } from '../View';
import { VisuallyHidden } from '../VisuallyHidden';
import type { BasePaginationItemProps } from '../types/pagination';
import { ComponentText } from '../shared/constants';
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
  const icons = useIcons('pagination');
  const nextClasses = classNames(
    ComponentClassName.PaginationItem,
    classNameModifier(ComponentClassName.PaginationItem, 'link'),
    classNameModifierByFlag(
      ComponentClassName.PaginationItem,
      'disabled',
      isDisabled
    )
  );
  const previousClasses = classNames(
    ComponentClassName.PaginationItem,
    classNameModifier(ComponentClassName.PaginationItem, 'link'),
    classNameModifierByFlag(
      ComponentClassName.PaginationItem,
      'disabled',
      isDisabled
    )
  );

  switch (type) {
    case 'page':
      return (
        <View as="li">
          {page === currentPage ? (
            <Button
              aria-current="page"
              size="small"
              variation="link"
              className={classNames(
                ComponentClassName.PaginationItem,
                classNameModifier(ComponentClassName.PaginationItem, 'current')
              )}
              testId={PAGINATION_CURRENT_TEST_ID}
              {...rest}
            >
              <VisuallyHidden>{currentPageLabel}:</VisuallyHidden>
              {page}
            </Button>
          ) : (
            <Button
              className={ComponentClassName.PaginationItem}
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
            {icons?.next ?? <IconChevronRight />}
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
            {icons?.previous ?? <IconChevronLeft />}
          </Button>
        </View>
      );
    case 'ellipsis':
      return (
        <View as="li">
          <Flex
            as="span"
            className={classNameModifier(
              ComponentClassName.PaginationItem,
              'ellipsis'
            )}
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
