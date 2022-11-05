import React, { ReactElement } from 'react';
import { act, create, ReactTestRenderer } from 'react-test-renderer';

import { Carousel } from '../../../../primitives';
import CarouselMessage from '../CarouselMessage';

jest.mock('../../../../primitives', () => ({ Carousel: 'Carousel' }));
jest.mock('../../MessageWrapper', () => ({ MessageWrapper: 'MessageWrapper' }));
jest.mock('../CarouselMessageItem', () => 'CarouselMessageItem');

const baseProps = { layout: 'CAROUSEL' as const, data: [] };

describe('CarouselMessage', () => {
  let carouselMessage: ReactTestRenderer;
  let itemRenderer: ReactTestRenderer;

  it('renders as expected', () => {
    act(() => {
      carouselMessage = create(<CarouselMessage {...baseProps} />);
    });

    expect(carouselMessage.toJSON()).toMatchSnapshot();
  });

  it('allows style overrides', () => {
    const overrides = {
      pageIndicatorActive: { backgroundColor: 'red' },
      pageIndicatorInactive: { backgroundColor: 'blue' },
    };
    act(() => {
      carouselMessage = create(
        <CarouselMessage {...baseProps} style={overrides} />
      );
    });

    expect(carouselMessage.toJSON()).toMatchSnapshot();
  });

  it('renders items', () => {
    act(() => {
      carouselMessage = create(<CarouselMessage {...baseProps} />);
    });
    const carousel = carouselMessage.root.findByType(Carousel);
    const Item = () =>
      (carousel.props as { renderItem: (data) => ReactElement }).renderItem({
        item: { image: { src: 'image-src' } },
      });

    act(() => {
      itemRenderer = create(<Item />);
    });

    expect(itemRenderer.toJSON()).toMatchSnapshot();
  });
});
