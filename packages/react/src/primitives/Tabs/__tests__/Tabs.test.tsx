import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { Tabs } from '../Tabs';
import { Text } from '../../Text';
import { ComponentClassName } from '@aws-amplify/ui';

describe('Tabs', () => {
  it('can render custom classnames', async () => {
    render(
      <Tabs.Container className="custom-classname" testId="tabsId">
        <Tabs.List>
          <Tabs.Item value="1">Tab 1</Tabs.Item>
        </Tabs.List>
        <Tabs.Panel value="1">Tab 1</Tabs.Panel>
      </Tabs.Container>
    );

    const tabs = await screen.findByTestId('tabsId');
    expect(tabs.className).toContain('custom-classname');
    expect(tabs.className).toContain(ComponentClassName.Tabs);
  });

  it('can render any arbitrary data-* attribute', async () => {
    render(
      <Tabs.Container data-demo="true" testId="tabsTest">
        <Tabs.List>
          <Tabs.Item value="1">Tab 1</Tabs.Item>
          <Tabs.Item value="2">Tab 2</Tabs.Item>
        </Tabs.List>
        <Tabs.Panel value="1">Tab 1</Tabs.Panel>
        <Tabs.Panel value="2">Tab 2</Tabs.Panel>
      </Tabs.Container>
    );
    const tabs = await screen.findByTestId('tabsTest');
    expect(tabs.dataset['demo']).toBe('true');
  });

  it('should forward ref to Tabs DOM element', async () => {
    const ref = React.createRef<HTMLDivElement>();

    render(
      <Tabs.Container ref={ref} testId="tabsId">
        <Tabs.List>
          <Tabs.Item value="1">Tab 1</Tabs.Item>
        </Tabs.List>
      </Tabs.Container>
    );

    await screen.findByTestId('tabsId');
    expect(ref.current?.nodeName).toBe('DIV');
  });

  it('should skip over null children', async () => {
    render(
      <Tabs.Container>
        <Tabs.List testId="tabsTest">
          <Tabs.Item value="1">Tab 1</Tabs.Item>
          {null}
        </Tabs.List>
        <Tabs.Panel value="1">Tab 1</Tabs.Panel>
        {null}
      </Tabs.Container>
    );
    const tabs = await screen.findByTestId('tabsTest');
    const panels = await screen.findAllByRole('tabpanel');
    expect(tabs.children).toHaveLength(1);
    expect(panels).toHaveLength(1);
  });

  it('should work with defaultValue', async () => {
    render(
      <Tabs.Container testId="tabsTest" defaultValue="2">
        <Tabs.List>
          <Tabs.Item value="1">Tab 1</Tabs.Item>
          {null}
          {undefined}
          <Tabs.Item value="2">Tab 2</Tabs.Item>
        </Tabs.List>
        <Tabs.Panel value="1">Tab 1</Tabs.Panel>
        <Tabs.Panel value="2">Tab 2</Tabs.Panel>
      </Tabs.Container>
    );
    const tabs = await screen.findAllByRole('tab');
    expect(tabs).toHaveLength(2);
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
  });

  describe('TabItem', () => {
    it('can render custom classnames', async () => {
      render(
        <Tabs.Container>
          <Tabs.List>
            <Tabs.Item className="custom-classname" value="Tab 1">
              Tab 1
            </Tabs.Item>
          </Tabs.List>
        </Tabs.Container>
      );

      const tab = await screen.findByRole('tab');
      expect(tab.className).toContain('custom-classname');
      expect(tab.className).toContain(ComponentClassName.TabsItem);
    });

    it('should handle React nodes in the title', async () => {
      render(
        <Tabs.Container>
          <Tabs.List>
            <Tabs.Item value="1">
              <Text testId="test">Test1234</Text>
            </Tabs.Item>
          </Tabs.List>
        </Tabs.Container>
      );

      const tab = await screen.findByTestId('test');
      expect(tab.innerHTML).toContain('Test1234');
    });

    it('should render disabled button when disabled', async () => {
      render(
        <Tabs.Container data-demo="true" testId="tabsTest">
          <Tabs.List>
            <Tabs.Item value="Tab 1" isDisabled>
              Tab 1
            </Tabs.Item>
          </Tabs.List>
        </Tabs.Container>
      );

      const tab = await screen.findByRole('tab');
      expect(tab).toHaveAttribute('disabled');
    });

    it('should forward ref to TabItem Button DOM element', async () => {
      const ref = React.createRef<HTMLButtonElement>();

      render(
        <Tabs.Container>
          <Tabs.Item ref={ref} value="Tab 1">
            Tab 1
          </Tabs.Item>
        </Tabs.Container>
      );

      await screen.findByRole('tab');
      expect(ref.current?.nodeName).toBe('BUTTON');
    });
  });
});
