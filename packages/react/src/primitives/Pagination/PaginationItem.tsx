import React, { useCallback } from 'react';

import { Button } from '../Button';
import { Flex } from '../Flex';
import { Text } from '../Text';
import { View } from '../View';
import { IconChevronLeft, IconChevronRight } from '../Icon';
import { PaginationItemProps } from '../types/pagination';

export const PaginationItem: React.FC<PaginationItemProps> = props => {
  const {
    type,
    page,
    currentPage,
    isDisabled,
    onClick,
    ariaLabel,
    ...rest
  } = props;

  switch (type) {
    case 'page':
      const onChange = useCallback(() => {
        onClick(page, currentPage);
      }, [page, currentPage, onClick]);
      return (
        <View as="li">
          {page === currentPage ? (
            <Flex
              as="span"
              className="current"
              justifyContent="center"
              alignItems="center"
              {...rest}
            >
              {/**
               * Use markup to indicate the current item of a menu, such as the current page on a website, to improve orientation in the menu.
               * @link https://www.w3.org/WAI/tutorials/menus/structure/#indicate-the-current-item
               */}
              <Text as="span" className="visuallyhidden">
                Current Page:
              </Text>
              {page}
            </Flex>
          ) : (
            <Button
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
      const onNext = useCallback(() => {
        onClick();
      }, [onClick]);
      return (
        <View as="li">
          <Button
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
      const onPrevious = useCallback(() => {
        onClick();
      }, [onClick]);
      return (
        <View as="li">
          <Button
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
            className="ellipsis"
            testId="ellipsis"
            alignItems="baseline"
            justifyContent="center"
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
