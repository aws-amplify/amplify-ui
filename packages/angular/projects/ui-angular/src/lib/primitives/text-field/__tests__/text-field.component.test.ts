import { render } from '@testing-library/angular';

import { TextFieldComponent } from '../text-field.component';

describe('amplify-text-field', () => {
  it('renders as expected', async () => {
    const { container } = await render(TextFieldComponent, {
      componentProperties: {
        label: 'Input',
        fieldId: 'input',
        placeholder: 'Enter something',
        type: 'text',
      },
    });
    expect(container).toMatchSnapshot();
  });
});
