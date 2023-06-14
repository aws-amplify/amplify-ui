import React, { useMemo } from 'react';
import { MessageContentProps } from '@aws-amplify/ui-react-core-notifications';

import { Carousel } from '../../../primitives';
import { IN_APP_MESSAGING_TEST_ID } from '../../constants';

import { MessageWrapper } from '../MessageWrapper';
import CarouselMessageItem from './CarouselMessageItem';
import { defaultStyle } from './styles';
import { CarouselMessageProps } from './types';

export default function CarouselMessage(
  props: CarouselMessageProps
): JSX.Element {
  const { data, ...rest } = props;
  const { style } = rest;

  const indicatorStyle = useMemo(
    () => ({
      active: [defaultStyle.pageIndicatorActive, style?.pageIndicatorActive],
      inactive: [
        defaultStyle.pageIndicatorInactive,
        style?.pageIndicatorInactive,
      ],
    }),
    [style]
  );

  const renderItem = ({ item }: { item: MessageContentProps }) => (
    <CarouselMessageItem {...item} {...rest} />
  );

  return (
    <MessageWrapper disableSafeAreaView>
      <Carousel
        data={data ?? []}
        renderItem={renderItem}
        indicatorActiveStyle={indicatorStyle.active}
        indicatorInactiveStyle={indicatorStyle.inactive}
        testID={IN_APP_MESSAGING_TEST_ID.CAROUSEL}
      />
    </MessageWrapper>
  );
}
