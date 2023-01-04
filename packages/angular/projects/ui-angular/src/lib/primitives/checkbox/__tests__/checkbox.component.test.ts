import { render } from '@testing-library/angular';

import { CheckboxComponent } from '../checkbox.component';

describe('CheckBox', () => {
  it('renders as expected', async () => {
    const { container } = await render(CheckboxComponent, {
      componentProperties: {
        label: 'My Checkbox',
        name: 'checkbox',
        value: 'value',
      },
    });
    expect(container).toMatchSnapshot();
  });
});
