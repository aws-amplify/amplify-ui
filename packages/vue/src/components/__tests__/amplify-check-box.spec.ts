import { fireEvent, render } from '@testing-library/vue';

import AmplifyCheckbox from '../primitives/amplify-check-box.vue';

describe('Amplify Checkbox', () => {
  it('should render as expected', () => {
    const { container } = render(AmplifyCheckbox);
    expect(container).toMatchSnapshot();
  });

  it('renders the error message when unchecked', () => {
    const { getByText } = render(AmplifyCheckbox, {
      props: { errorMessage: 'This field is required' },
    });

    expect(getByText('This field is required')).toBeTruthy();
  });

  it('toggles checked state and hides the error message when clicked', async () => {
    const { container, queryByText } = render(AmplifyCheckbox, {
      props: { errorMessage: 'This field is required' },
    });

    const input = container.querySelector('input[type="checkbox"]')!;
    const button = container.querySelector('.amplify-checkbox__button')!;

    // unchecked by default: error is shown and error class applied
    expect(queryByText('This field is required')).toBeTruthy();
    expect(button.classList.contains('amplify-checkbox__button--error')).toBe(
      true
    );
    expect(button.getAttribute('data-checked')).toBe('false');

    await fireEvent.click(input);

    // checked: error is hidden and checked bindings are applied
    expect(queryByText('This field is required')).toBeNull();
    expect(button.classList.contains('amplify-checkbox__button--error')).toBe(
      false
    );
    expect(button.getAttribute('data-checked')).toBe('true');
  });
});
