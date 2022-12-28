import React, { useState } from 'react';
import { fireEvent, render, renderHook } from '@testing-library/react-native';

import { useTheme } from '../../../theme';
import { Tab, Tabs } from '..';
import { getThemedStyles } from '../styles';

const onChangeMock = jest.fn();

const ControlledTabs = ({
  onChangeCallback,
  selectedIndex,
}: {
  onChangeCallback?: jest.Mock<any, any>;
  selectedIndex?: number;
}) => {
  const [index, setIndex] = useState(selectedIndex);
  const onChangeHandler = (nextIndex: number) => {
    setIndex(nextIndex);
    onChangeCallback?.(nextIndex);
  };

  return (
    <Tabs onChange={onChangeHandler} selectedIndex={index}>
      <Tab>Sign In</Tab>
      <Tab>Create Account</Tab>
      <Tab disabled>Disabled Tab</Tab>
    </Tabs>
  );
};

describe('Tabs', () => {
  beforeEach(() => {
    onChangeMock.mockClear();
  });

  it('can be used as a controlled component', () => {
    const { queryAllByRole } = render(
      <ControlledTabs onChangeCallback={onChangeMock} />
    );

    const tabs = queryAllByRole('tab');
    fireEvent.press(tabs[1]);
    expect(onChangeMock).toBeCalledWith(1);
    fireEvent.press(tabs[0]);
    expect(onChangeMock).toBeCalledWith(0);
  });

  it('does not allow disabled Tabs to be selected', () => {
    const { queryAllByRole } = render(
      <ControlledTabs onChangeCallback={onChangeMock} />
    );

    const tabs = queryAllByRole('tab');
    fireEvent.press(tabs[2]);
    expect(onChangeMock).not.toHaveBeenCalled();
    expect(tabs[2].props.accessibilityState).toHaveProperty('disabled', true);
  });

  it('applies theme and custom styling', () => {
    const customStyles = { backgroundColor: 'blue' };
    const { getByRole, toJSON } = render(
      <Tabs style={customStyles}>
        <Tab>Sign In</Tab>
        <Tab>Create Account</Tab>
      </Tabs>
    );

    expect(toJSON()).toMatchSnapshot();

    const { result } = renderHook(() => useTheme());
    const themedStyle = getThemedStyles(result.current);

    const tablist = getByRole('tablist');

    expect(tablist.props.style).toStrictEqual([
      themedStyle.tabList,
      customStyles,
    ]);
  });
});
