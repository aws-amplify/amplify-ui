import React from 'react';
import { render, screen } from '@testing-library/react-native';

import CarouselPageIndicator from '../CarouselPageIndicator';

import {
  DEFAULT_CAROUSEL_INDICATOR_ACTIVE_STYLE,
  DEFAULT_CAROUSEL_INDICATOR_INACTIVE_STYLE,
} from '../constants';

const INDICATOR_TEST_ID = 'indicator-test-id';

describe('CarouselPageIndicator', () => {
  it('renders with multiple items', () => {
    render(
      <CarouselPageIndicator
        currentIndex={0}
        indicatorTestId={INDICATOR_TEST_ID}
        numberOfItems={3}
      />
    );

    const items = screen.queryAllByTestId(INDICATOR_TEST_ID);

    expect(items).toHaveLength(3);
  });

  it('renders with just one item', () => {
    render(
      <CarouselPageIndicator
        currentIndex={0}
        indicatorTestId={INDICATOR_TEST_ID}
        numberOfItems={1}
      />
    );

    const items = screen.queryAllByTestId(INDICATOR_TEST_ID);
    expect(items).toHaveLength(1);
  });

  it('handles null numberOfItems value', () => {
    // Ideally, this should not happen but, if it does, we should be able to handle gracefully
    render(
      <CarouselPageIndicator
        currentIndex={0}
        indicatorTestId={INDICATOR_TEST_ID}
        numberOfItems={null as any}
      />
    );

    const items = screen.queryByTestId(INDICATOR_TEST_ID);

    expect(items).toBeNull();
  });

  it('renders indicator styles based on current index', () => {
    render(
      <CarouselPageIndicator
        currentIndex={1}
        indicatorTestId={INDICATOR_TEST_ID}
        numberOfItems={3}
      />
    );

    const items = screen.queryAllByTestId(INDICATOR_TEST_ID);

    expect(items[0].props.style).toStrictEqual([
      DEFAULT_CAROUSEL_INDICATOR_INACTIVE_STYLE,
      undefined,
    ]);
    expect(items[1].props.style).toStrictEqual([
      DEFAULT_CAROUSEL_INDICATOR_ACTIVE_STYLE,
      undefined,
    ]);
    expect(items[2].props.style).toStrictEqual([
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
