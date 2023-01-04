import { render } from '@testing-library/angular';

import { ButtonComponent } from '../button.component';

describe('amplify-button', () => {
  it('renders as expected', async () => {
    const { container } = await render(
      '<button amplify-button>My Button</button>',
      {
        declarations: [ButtonComponent],
        componentProperties: { label: 'Password', fieldId: 'mockId' },
      }
    );
    expect(container).toMatchSnapshot();
  });
});
