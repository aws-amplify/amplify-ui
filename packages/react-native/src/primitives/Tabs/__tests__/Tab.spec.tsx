import React from 'react';
import { StyleSheet, Text, ViewStyle } from 'react-native';
import { render } from '@testing-library/react-native';

import { Tab } from '..';
import { styles } from '../styles';

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

    const tab = getByRole('tab');
    // select second index as `Button` applies its own style first
    expect((tab.props.style as ViewStyle[])[1]).toStrictEqual([
      styles.tab,
      styles.readonly,
      styles.selected,
      null,
    ]);
  });

  it('can apply custom styling', () => {
    const { getByRole, toJSON } = render(
      <Tab style={customStyles.tabStyle}>Styled Tab</Tab>
    );

    expect(toJSON()).toMatchSnapshot();

    const tab = getByRole('tab');
    // select second index as `Button` applies its own style first
    expect((tab.props.style as ViewStyle[])[1]).toStrictEqual([
      styles.tab,
      null,
      null,
      customStyles.tabStyle,
    ]);
  });
});
