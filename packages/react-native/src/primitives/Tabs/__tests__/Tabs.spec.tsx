import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';

import { Tab, Tabs } from '../Tabs';

const firstTabContent = 'Sign in content panel';
const secondTabContent = 'Create account content panel';
const disabledTabContent = 'This content should not be visible';

const onChangeMock = jest.fn();

const ControlledTabs = ({
  onChangeCallback,
  selectedIndex,
}: {
  onChangeCallback: jest.Mock<any, any>;
  selectedIndex: number;
}) => {
  const [index, setIndex] = useState(selectedIndex);
  const onChangeHandler = (nextIndex: number) => {
    setIndex(nextIndex);
    onChangeCallback(nextIndex);
  };

  return (
    <Tabs onChange={onChangeHandler} selectedIndex={index}>
      <Tab title="Sign In">
        <Text>{firstTabContent}</Text>
      </Tab>
      <Tab title="Create Account">
        <Text>{secondTabContent}</Text>
      </Tab>
      <Tab title="Disabled Tab" disabled>
        <Text>{disabledTabContent}</Text>
      </Tab>
    </Tabs>
  );
};

describe('Tabs', () => {
  beforeEach(() => {
    onChangeMock.mockClear();
  });

  it('renders default Tabs as expected', () => {
    const { toJSON } = render(
      <Tabs>
        <Tab title="Tab 1">
          <Text>Tab 1 content panel</Text>
        </Tab>
        <Tab title="Tab 2">
          <Text>Tab 2 content panel</Text>
        </Tab>
      </Tabs>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('allows users to select tabs and view their respective contents', () => {
    const { queryAllByRole, queryByText } = render(
      <Tabs>
        <Tab title="Sign In">
          <Text>{firstTabContent}</Text>
        </Tab>
        <Tab title="Create Account">
          <Text>{secondTabContent}</Text>
        </Tab>
      </Tabs>
    );

    const tabs = queryAllByRole('tab');

    expect(queryByText(firstTabContent)).toBeTruthy();
    expect(queryByText(secondTabContent)).toBeNull();

    fireEvent.press(tabs[1]);

    expect(queryByText(firstTabContent)).toBeNull();
    expect(queryByText(secondTabContent)).toBeTruthy();
  });

  it('can be used as a controlled component', () => {
    const { queryAllByRole, queryByText } = render(
      <ControlledTabs onChangeCallback={onChangeMock} selectedIndex={1} />
    );

    const tabs = queryAllByRole('tab');

    expect(queryByText(firstTabContent)).toBeNull();
    expect(queryByText(secondTabContent)).toBeTruthy();

    fireEvent.press(tabs[0]);

    expect(onChangeMock).toBeCalledWith(0);

    expect(queryByText(firstTabContent)).toBeTruthy();
    expect(queryByText(secondTabContent)).toBeNull();
  });

  it('does not allow disabled Tabs to be selected', () => {
    const { queryAllByRole, queryByText } = render(
      <ControlledTabs onChangeCallback={onChangeMock} selectedIndex={0} />
    );

    const tabs = queryAllByRole('tab');

    expect(queryByText(firstTabContent)).toBeTruthy();
    expect(queryByText(secondTabContent)).toBeNull();
    expect(queryByText(disabledTabContent)).toBeNull();

    fireEvent.press(tabs[2]);

    expect(onChangeMock).not.toHaveBeenCalled();

    expect(queryByText(firstTabContent)).toBeTruthy();
    expect(queryByText(secondTabContent)).toBeNull();
    expect(queryByText(disabledTabContent)).toBeNull();
  });

  it('renders correctly based on defaultIndex', () => {
    const { queryByText } = render(
      <Tabs defaultIndex={1}>
        <Tab title="Tab 1">
          <Text>{firstTabContent}</Text>
        </Tab>
        <Tab title="Tab 2">
          <Text>{secondTabContent}</Text>
        </Tab>
      </Tabs>
    );

    expect(queryByText(firstTabContent)).toBeNull();
    expect(queryByText(secondTabContent)).toBeTruthy();
  });

  it('does not render children that are not Tab components', () => {
    const sampleText = 'This should not be rendered as a Tab';

    const { queryAllByRole } = render(
      <Tabs defaultIndex={1}>
        <Tab title="Tab 1">
          <Text>{firstTabContent}</Text>
        </Tab>
        <Tab title="Tab 2">
          <Text>{secondTabContent}</Text>
        </Tab>
        <View>
          <Text>{sampleText}</Text>
        </View>
      </Tabs>
    );

    const tabs = queryAllByRole('tab');

    expect(tabs.length).toBe(2);
  });
});
