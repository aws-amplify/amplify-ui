import { render } from '@testing-library/angular';

import { SelectComponent } from '../select.component';

describe('amplify-form-select', () => {
  it('renders as expected', async () => {
    const { container } = await render(SelectComponent, {
      componentProperties: {
        name: 'select',
        label: 'Select',
        id: 'mock-id-0',
      },
      declarations: [SelectComponent],
    });
    expect(container).toMatchSnapshot();
  });
});
