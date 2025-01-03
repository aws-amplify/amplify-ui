import React from 'react';
import { render } from '@testing-library/react-native';

import CarouselPageIndicator from '../CarouselPageIndicator';
import { ReactTestRendererJSON } from 'react-test-renderer';
import {
  DEFAULT_CAROUSEL_INDICATOR_ACTIVE_STYLE,
  DEFAULT_CAROUSEL_INDICATOR_INACTIVE_STYLE,
} from '../constants';

describe('CarouselPageIndicator', () => {
  it('renders with multiple items', () => {
    const { toJSON } = render(
      <CarouselPageIndicator currentIndex={0} numberOfItems={3} />
    );

    expect(toJSON()).toMatchSnapshot();

    const { children } = toJSON() as ReactTestRendererJSON;
    expect(children).toHaveLength(3);
  });

  it('renders with just one item', () => {
    const { toJSON } = render(
      <CarouselPageIndicator currentIndex={0} numberOfItems={1} />
    );

    expect(toJSON()).toMatchSnapshot();
    const { children } = toJSON() as ReactTestRendererJSON;
    expect(children).toHaveLength(1);
  });

  it('handles null numberOfItems value', () => {
    // Ideally, this should not happen but, if it does, we should be able to handle gracefully
    const { toJSON } = render(
      <CarouselPageIndicator currentIndex={0} numberOfItems={null as any} />
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders indicator styles based on current index', () => {
    const { toJSON } = render(
      <CarouselPageIndicator currentIndex={1} numberOfItems={3} />
    );

    const { children } = toJSON() as ReactTestRendererJSON;

    expect(toJSON()).toMatchSnapshot();

    expect((children?.[0] as ReactTestRendererJSON).props.style).toStrictEqual([
      DEFAULT_CAROUSEL_INDICATOR_INACTIVE_STYLE,
      undefined,
    ]);
    expect((children?.[1] as ReactTestRendererJSON).props.style).toStrictEqual([
      DEFAULT_CAROUSEL_INDICATOR_ACTIVE_STYLE,
      undefined,
    ]);
    expect((children?.[2] as ReactTestRendererJSON).props.style).toStrictEqual([
      DEFAULT_CAROUSEL_INDICATOR_INACTIVE_STYLE,
      undefined,
    ]);
  });

  it('handles null index value', () => {
    // Ideally, this should not happen but, if it does, we should be able to handle gracefully
    const { toJSON } = render(
      <CarouselPageIndicator currentIndex={null} numberOfItems={5} />
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
