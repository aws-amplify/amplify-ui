import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { render, renderHook } from '@testing-library/react-native';

import { useTheme } from '../../../theme';
import { Tab } from '..';
import { getThemedStyles } from '../styles';
import { getThemedStyles as getButtonThemedStyles } from '../../Button/styles';

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
    const buttonThemedStyle = getButtonThemedStyles(result.current);

    const tab = getByRole('tab');
    expect(tab.props.style).toStrictEqual([
      { ...buttonThemedStyle.container, ...buttonThemedStyle.containerDefault },
      undefined,
      [
        {
          ...themedStyle.tab,
          ...themedStyle.readonly,
          ...themedStyle.selected,
        },
        undefined,
        undefined,
      ],
    ]);
  });

  it('can apply custom styling', () => {
    const { getByRole, toJSON } = render(
      <Tab style={customStyles.tabStyle}>Styled Tab</Tab>
    );

    expect(toJSON()).toMatchSnapshot();

    const { result } = renderHook(() => useTheme());
    const themedStyle = getThemedStyles(result.current);
    const buttonThemedStyle = getButtonThemedStyles(result.current);

    const tab = getByRole('tab');
    expect(tab.props.style).toStrictEqual([
      { ...buttonThemedStyle.container, ...buttonThemedStyle.containerDefault },
      undefined,
      [{ ...themedStyle.tab }, undefined, customStyles.tabStyle],
    ]);
  });
});
