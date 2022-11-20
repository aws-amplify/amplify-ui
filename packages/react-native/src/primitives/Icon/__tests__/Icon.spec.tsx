import React from 'react';
import { render, renderHook } from '@testing-library/react-native';
import { ConsoleLogger as Logger } from '@aws-amplify/core';

import { useTheme } from '../../../theme';
import { getThemedStyles } from '../styles';
import Icon from '../Icon';
import { IconProps, iconSizes } from '..';
import { Size } from '../types';

// use empty mockImplementation to turn off console output
const warnSpy = jest.spyOn(Logger.prototype, 'warn').mockImplementation();

const MOCK_SOURCE = { uri: 'mock.png' };
const testID = 'iconTestID';
const props: IconProps = {
  source: MOCK_SOURCE,
  testID,
};

describe('Icon', () => {
  it('renders as expected', () => {
    const { toJSON, getByTestId } = render(<Icon {...props} />);
    expect(toJSON()).toMatchSnapshot();

    const { result } = renderHook(() => useTheme());
    const themedStyle = getThemedStyles(result.current);

    const image = getByTestId(testID);
    expect(image.props.accessibilityRole).toEqual('image');
    expect(image.props.source).toEqual(MOCK_SOURCE);

    expect(themedStyle.icon.height).toEqual(iconSizes.medium);
    expect(themedStyle.icon.width).toEqual(iconSizes.medium);
    expect(image.props.style).toStrictEqual([themedStyle.icon, undefined]);
  });

  it('renders as expected with custom styles', () => {
    const customStyle = { tintColor: 'red' };
    const { toJSON, getByTestId } = render(
      <Icon {...props} style={customStyle} />
    );
    expect(toJSON()).toMatchSnapshot();

    const { result } = renderHook(() => useTheme());
    const themedStyle = getThemedStyles(result.current);

    expect(getByTestId(testID).props.style).toStrictEqual([
      themedStyle.icon,
      customStyle,
    ]);
  });

  it('renders an animated icon', () => {
    const { toJSON } = render(<Icon {...props} animated />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should override size as number', () => {
    const testSize = 22;
    const { toJSON, getByTestId } = render(<Icon {...props} size={testSize} />);
    expect(toJSON()).toMatchSnapshot();

    const { result } = renderHook(() => useTheme());
    const themedStyle = getThemedStyles(result.current, undefined, testSize);

    const image = getByTestId(testID);
    expect(themedStyle.icon.height).toEqual(testSize);
    expect(themedStyle.icon.width).toEqual(testSize);
    expect(image.props.style).toStrictEqual([themedStyle.icon, undefined]);
  });

  it('should override size as string', () => {
    const testSize = 'large';
    const { toJSON, getByTestId } = render(<Icon {...props} size={testSize} />);
    expect(toJSON()).toMatchSnapshot();

    const { result } = renderHook(() => useTheme());
    const themedStyle = getThemedStyles(result.current, undefined, testSize);

    const image = getByTestId(testID);
    expect(themedStyle.icon.height).toEqual(iconSizes[testSize]);
    expect(themedStyle.icon.width).toEqual(iconSizes[testSize]);
    expect(image.props.style).toStrictEqual([themedStyle.icon, undefined]);
  });

  it('throws an error for invalid size type', () => {
    const invalidSize = 'small_medium' as unknown as Size;

    const { toJSON } = render(<Icon {...props} size={invalidSize} />);
    expect(toJSON()).toMatchSnapshot();

    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(
      `"${invalidSize}" is not a valid icon size. Available values are: ${Object.keys(
        iconSizes
      )}`
    );
  });
});
