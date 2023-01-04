import { render } from '@testing-library/angular';

import { ButtonComponent } from '../button.component';

describe('PasswordField', () => {
  it('renders as expected', async () => {
    const { container } = await render('<button amplify-button></button>', {
      declarations: [ButtonComponent],
      componentProperties: { label: 'Password', fieldId: 'mockId' },
    });
    expect(container).toMatchSnapshot();
  });
});
