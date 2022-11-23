import React from 'react';
import { StyleSheet, Text, ViewStyle } from 'react-native';
import { render, renderHook } from '@testing-library/react-native';

import { useTheme } from '../../../theme';
import { Tab } from '..';
import { getThemedStyles } from '../styles';

const customStyles = StyleSheet.create({
  tabStyle: {
    backgroundColor: 'lavender',
    borderTopColor: 'rebeccapurple',
  },
});

describe('Tab', () => {
  it('renders default Tab as expected', () => {
    const { toJSON } = render(<Tab>Default Tab</Tab>);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders as expected with a component passed as children', () => {
    const { toJSON } = render(
      <Tab>
        <Text>Text component</Text>
      </Tab>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders as expected when Tab is selected', () => {
    const { getByRole, toJSON } = render(<Tab selected>Selected Tab</Tab>);

    expect(toJSON()).toMatchSnapshot();

    const { result } = renderHook(() => useTheme());
    const themedStyle = getThemedStyles(result.current);

    const tab = getByRole('tab');
    // select second index as `Button` applies its own style first
    expect((tab.props.style as ViewStyle[])[4]).toStrictEqual([
      themedStyle.tab,
      themedStyle.readonly,
      themedStyle.selected,
      null,
    ]);
  });

  it('can apply custom styling', () => {
    const { getByRole, toJSON } = render(
      <Tab style={customStyles.tabStyle}>Styled Tab</Tab>
    );

    expect(toJSON()).toMatchSnapshot();

    const { result } = renderHook(() => useTheme());
    const themedStyle = getThemedStyles(result.current);

    const tab = getByRole('tab');
    // select second index as `Button` applies its own style first
    expect((tab.props.style as ViewStyle[])[4]).toStrictEqual([
      themedStyle.tab,
      null,
      null,
      customStyles.tabStyle,
    ]);
  });
});
