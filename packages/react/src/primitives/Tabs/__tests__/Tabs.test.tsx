import { render, screen } from '@testing-library/react';
import { Tabs, TabItem } from '../Tabs';
import { ComponentClassNames } from '../../shared';
import { ComponentPropsToStylePropsMap } from '../../types';
import { kebabCase } from 'lodash';

describe('Tabs: ', () => {
  it('can render any arbitrary data-* attribute', async () => {
    render(
      <Tabs data-demo="true" testId="tabsTest">
        <TabItem title="Tab 1">Tab 1</TabItem>
        <TabItem title="Tab 2">Tab 2</TabItem>
      </Tabs>
    );
    const tabs = await screen.findByTestId('tabsTest');
    expect(tabs.dataset['demo']).toBe('true');
  });
});
