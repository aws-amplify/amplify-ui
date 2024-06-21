import * as React from 'react';
import { paginationClasses } from '@aws-amplify/ui';

import { Button } from '../Button';
import { Flex } from '../Flex';
import { IconChevronLeft, IconChevronRight, useIcons } from '../Icon';
import { View } from '../View';
import { VisuallyHidden } from '../VisuallyHidden';
import { BasePaginationItemProps } from '../types/pagination';
import { ComponentText } from '../shared/constants';

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

  const prevNextClasses = paginationClasses({
    _element: {
      item: [isDisabled ? 'disabled' : undefined],
    },
  });

  switch (type) {
    case 'page':
      return (
        <View as="li">
          {page === currentPage ? (
            <Button
              aria-current="page"
              size="small"
              variation="link"
              className={paginationClasses({
                _element: {
                  item: ['current'],
                },
              })}
              testId={PAGINATION_CURRENT_TEST_ID}
              {...rest}
            >
              <VisuallyHidden>{currentPageLabel}:</VisuallyHidden>
              {page}
            </Button>
          ) : (
            <Button
              className={paginationClasses({ _element: 'item' })}
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
            className={prevNextClasses}
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
            className={prevNextClasses}
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
            className={paginationClasses({
              _element: {
                item: ['ellipsis'],
              },
            })}
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
