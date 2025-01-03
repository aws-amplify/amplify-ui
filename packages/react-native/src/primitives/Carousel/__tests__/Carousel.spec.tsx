import React from 'react';
import {
  Dimensions,
  EmitterSubscription,
  FlatList,
  ListRenderItem,
  Text,
  ViewToken,
} from 'react-native';
import { act, render } from '@testing-library/react-native';

import Carousel from '../Carousel';
import { ReactTestInstance } from 'react-test-renderer';

jest.mock('../CarouselPageIndicator', () => 'CarouselPageIndicator');

type ItemProps = { str?: string };

const Item = ({ str }: ItemProps) => <Text>{str}</Text>;
const renderItem: ListRenderItem<ItemProps> = ({ item }) => (
  <Item str={item.str} />
);

describe('Carousel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with multiple items in the data', () => {
    const data = [
      { key: 1, str: 'foo' },
      { key: 2, str: 'bar' },
    ];
    const { UNSAFE_root, getByText, toJSON } = render(
      <Carousel data={data} renderItem={renderItem} />
    );

    expect(toJSON()).toMatchSnapshot();
    expect(getByText(data[0].str)).toBeDefined();
    expect(getByText(data[1].str)).toBeDefined();

    const carouselPageIndicator = UNSAFE_root.children[1] as ReactTestInstance;
    expect(carouselPageIndicator.type).toBe('CarouselPageIndicator');
    expect(carouselPageIndicator.props.numberOfItems).toBe(2);
  });

  it('renders with just one item in the data', () => {
    const data = [{ key: 1, str: 'qux' }];
    const { UNSAFE_root, toJSON, getByText } = render(
      <Carousel data={data} renderItem={renderItem} />
    );

    expect(toJSON()).toMatchSnapshot();
    expect(getByText(data[0].str)).toBeDefined();
    const flatList = UNSAFE_root.children[0] as ReactTestInstance;
    expect(flatList.props.data).toStrictEqual(data);

    const carouselPageIndicator = UNSAFE_root.children[1] as ReactTestInstance;
    expect(carouselPageIndicator.type).toBe('CarouselPageIndicator');
    expect(carouselPageIndicator.props.numberOfItems).toBe(1);
  });

  it('returns null if data is null', () => {
    // Ideally, this should not happen but, if it does, we should be able to handle gracefully
    const { toJSON } = render(
      <Carousel data={null as any} renderItem={renderItem} />
    );

    expect(toJSON()).toBeNull();
  });

  it('returns null if there are no items in the data', () => {
    // Ideally, this should not happen but, if it does, we should be able to handle gracefully
    const { toJSON } = render(<Carousel data={[]} renderItem={renderItem} />);

    expect(toJSON()).toBeNull();
  });

  it('calls the orientation handler on orientation change', () => {
    let orientationHandler: Function;
    const data = [{ key: 1, str: 'qux' }];
    const window = { width: 350 };
    const addEventListenerSpy = jest.spyOn(Dimensions, 'addEventListener');
    // Get a reference to the orientation handler by spying on the `addEventListener` call
    addEventListenerSpy.mockImplementation(((_, handler) => {
      orientationHandler = handler;
      return { remove: jest.fn() } as unknown as EmitterSubscription;
    }) as Dimensions['addEventListener']);

    const { UNSAFE_root, toJSON } = render(
      <Carousel data={data} renderItem={renderItem} />
    );

    const flatList = UNSAFE_root.children[0] as ReactTestInstance;
    expect(flatList.props.snapToInterval).not.toBe(window.width);

    // Call the orientation handler with an arbitrary `ScaledSize`
    act(() => {
      orientationHandler({ window });
    });

    expect(flatList.props.snapToInterval).toBe(window.width);

    expect(toJSON()).toMatchSnapshot();
  });

  it('cleans up the orientation change listener', () => {
    const mockSubscription = { remove: jest.fn() };
    const addEventListenerSpy = jest.spyOn(Dimensions, 'addEventListener');
    (addEventListenerSpy as jest.Mock).mockReturnValue(mockSubscription);

    const { unmount } = render(<Carousel data={[]} renderItem={renderItem} />);

    act(() => {
      unmount();
    });
    expect(mockSubscription.remove).toHaveBeenCalled();
  });

  it('sets the index when viewable items change', () => {
    const data = [
      { key: 1, str: 'foo' },
      { key: 2, str: 'bar' },
    ];
    const { UNSAFE_root } = render(
      <Carousel data={data} renderItem={renderItem} />
    );

    const flatList = UNSAFE_root.children[0] as ReactTestInstance;
    const carouselPageIndicator = UNSAFE_root.children[1] as ReactTestInstance;

    const { onViewableItemsChanged } = flatList.props as FlatList['props'];

    expect(carouselPageIndicator.props.currentIndex).toBe(0);

    act(() => {
      const info = { viewableItems: [{ index: 1 } as ViewToken], changed: [] };
      onViewableItemsChanged!(info);
    });

    expect(carouselPageIndicator.props.currentIndex).toBe(1);

    // should not update the index if `viewableItems` is empty
    act(() => {
      const info = { viewableItems: [], changed: [] };
      onViewableItemsChanged!(info);
    });

    expect(carouselPageIndicator.props.currentIndex).toBe(1);
  });
});
