import { render } from '@testing-library/angular';

import { ErrorComponent } from '../error.component';
import { ButtonComponent } from '../../button/button.component';

describe('amplify-error', () => {
  it('renders as expected', async () => {
    const { container } = await render(
      '<amplify-error>mock error</amplify-error>',
      { declarations: [ErrorComponent, ButtonComponent] }
    );
    expect(container).toMatchSnapshot();
  });
});
