import { render } from '@testing-library/vue';

import AmplifyCheckbox from '../primitives/amplify-check-box.vue';

describe('Amplify Checkbox', () => {
  it('should render as expected', () => {
    const { container } = render(AmplifyCheckbox);
    expect(container).toMatchSnapshot();
  });
});
