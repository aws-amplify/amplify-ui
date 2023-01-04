import { render } from '@testing-library/angular';

import { PasswordFieldComponent } from '../password-field.component';

describe('amplify-password-field', () => {
  it('renders as expected', async () => {
    const { container } = await render(PasswordFieldComponent, {
      componentProperties: { label: 'Password', fieldId: 'mockId' },
    });
    expect(container).toMatchSnapshot();
  });
});
