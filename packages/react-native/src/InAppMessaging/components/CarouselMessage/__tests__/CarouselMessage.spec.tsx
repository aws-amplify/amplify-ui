import React, { ReactElement } from 'react';
import { render } from '@testing-library/react-native';

import { IN_APP_MESSAGING_TEST_ID } from '../../../constants';
import CarouselMessage from '../CarouselMessage';
import { defaultStyle } from '../styles';
import { ReactTestRendererJSON } from 'react-test-renderer';

jest.mock('../../../../primitives', () => ({ Carousel: 'Carousel' }));
jest.mock('../../MessageWrapper', () => ({ MessageWrapper: 'MessageWrapper' }));
jest.mock('../CarouselMessageItem', () => 'CarouselMessageItem');

const baseProps = {
  layout: 'CAROUSEL' as const,
  data: [],
};

describe('CarouselMessage', () => {
  it('renders as expected', () => {
    const { toJSON, getByTestId } = render(<CarouselMessage {...baseProps} />);

    expect(toJSON()).toMatchSnapshot();

    const carousel = getByTestId(IN_APP_MESSAGING_TEST_ID.CAROUSEL);
    expect(carousel).toBeDefined();
    expect(carousel.props.data).toStrictEqual(baseProps.data);
    expect(carousel.props.indicatorActiveStyle).toContain(
      defaultStyle.pageIndicatorActive
    );
    expect(carousel.props.indicatorInactiveStyle).toContain(
      defaultStyle.pageIndicatorInactive
    );
  });

  it('renders as expected with minimal props', () => {
    const { toJSON, getByTestId } = render(
      <CarouselMessage layout={baseProps.layout} />
    );

    expect(toJSON()).toMatchSnapshot();

    const carousel = getByTestId(IN_APP_MESSAGING_TEST_ID.CAROUSEL);
    expect(carousel).toBeDefined();
    expect(carousel.props.data).toEqual([]);
    expect(carousel.props.indicatorActiveStyle).toContain(
      defaultStyle.pageIndicatorActive
    );
    expect(carousel.props.indicatorInactiveStyle).toContain(
      defaultStyle.pageIndicatorInactive
    );
  });

  it('allows style overrides', () => {
    const overrides = {
      pageIndicatorActive: { backgroundColor: 'red' },
      pageIndicatorInactive: { backgroundColor: 'blue' },
    };
    const { toJSON, getByTestId } = render(
      <CarouselMessage {...baseProps} style={overrides} />
    );

    expect(toJSON()).toMatchSnapshot();

    const carousel = getByTestId(IN_APP_MESSAGING_TEST_ID.CAROUSEL);
    expect(carousel.props.indicatorActiveStyle).toContain(
      overrides.pageIndicatorActive
    );
    expect(carousel.props.indicatorInactiveStyle).toContain(
      overrides.pageIndicatorInactive
    );
  });

  it('renders items', () => {
    const { getByTestId } = render(<CarouselMessage {...baseProps} />);

    const carousel = getByTestId(IN_APP_MESSAGING_TEST_ID.CAROUSEL);
    const image = { src: 'image-src' };
    const Item = () =>
      (
        carousel.props as { renderItem: (data: any) => ReactElement }
      ).renderItem({
        item: { image },
      });
    const { toJSON } = render(<Item />);
    const carouselMessageItem = toJSON();
    expect(carouselMessageItem).toMatchSnapshot();

    const { props } = toJSON() as ReactTestRendererJSON;
    expect(props.layout).toEqual(baseProps.layout);
    expect(props.image).toEqual({ src: 'image-src' });
  });
});
