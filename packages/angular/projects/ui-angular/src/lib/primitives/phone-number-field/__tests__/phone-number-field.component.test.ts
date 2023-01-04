import { render } from '@testing-library/angular';

import { PhoneNumberFieldComponent } from '../phone-number-field.component';
import { SelectComponent } from '../../select/select.component';

describe('amplify-phone-number-field', () => {
  it('renders as expected', async () => {
    const { container } = await render(PhoneNumberFieldComponent, {
      componentProperties: {
        selectFieldId: 'mock-id-0',
        textFieldId: 'mock-id-1',
        name: 'phone-number',
      },
      declarations: [PhoneNumberFieldComponent, SelectComponent],
    });
    expect(container).toMatchSnapshot();
  });
});
