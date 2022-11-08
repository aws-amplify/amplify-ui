import React from 'react';
import { render, renderHook } from '@testing-library/react-native';

import { useTheme } from '../../../theme';
import { getThemedStyles } from '../styles';
import Icon from '../Icon';
import { IconProps } from '../types';

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

    const image = getByTestId(testID);
    expect(image.props.accessibilityRole).toEqual('image');
    expect(image.props.source).toEqual(MOCK_SOURCE);
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
});
