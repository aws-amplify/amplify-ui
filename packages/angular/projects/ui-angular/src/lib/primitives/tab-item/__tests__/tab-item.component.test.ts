import { render } from '@testing-library/angular';

import { TabItemComponent } from '../tab-item.component';

describe('amplify-tab-item', () => {
  it('renders as expected', async () => {
    const { container } = await render(TabItemComponent, {
      componentProperties: {
        title: 'Tab Item',
        id: 'mock-id-0',
        labelledById: 'mock-id-1',
        tabIndex: 0,
      },
      declarations: [TabItemComponent],
    });
    expect(container).toMatchSnapshot();
  });
});
