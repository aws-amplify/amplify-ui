const nanoid = jest.fn();
jest.mock('nanoid', () => ({
  nanoid,
}));

import { render } from '@testing-library/angular';

import { TabsComponent } from '../tabs.component';
import { TabItemComponent } from '../../tab-item/tab-item.component';

describe('amplify-tabs', () => {
  it('renders as expected', async () => {
    nanoid
      .mockReturnValueOnce('randomstring0')
      .mockReturnValueOnce('randomstring1');
    const { container } = await render(
      `
        <amplify-tabs>
          <amplify-tab-item title="First Tab"></amplify-tab-item>
          <amplify-tab-item title="Second Tab"></amplify-tab-item>
        </amplify-tabs>
      `,
      {
        componentProperties: {},
        declarations: [TabsComponent, TabItemComponent],
      }
    );
    expect(container).toMatchSnapshot();
  });
});
