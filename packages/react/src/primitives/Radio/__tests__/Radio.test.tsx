import { render, screen } from '@testing-library/react';

import { Radio } from '../Radio';
import { ComponentClassNames } from '../../shared';

describe('RadioField test suite', () => {
  it('should render basic props correctly', async () => {
    render(
      <Radio id="test" value="test" testId="test">
        test
      </Radio>
    );

    const radio = await screen.findByRole('radio');
    // input control
    expect(radio).toHaveAttribute('id', 'test');
    expect(radio).toHaveAttribute('value', 'test');
    expect(radio).toHaveClass(ComponentClassNames.Input);

    // custom radio button
    const radioButton = await screen.findByTestId('test');
    expect(radioButton).toHaveClass(ComponentClassNames.RadioButton);

    // label
    const radioLabel = await screen.findByText('test');
    expect(radioLabel).toContainHTML('test');
    expect(radioLabel).toHaveClass(ComponentClassNames.RadioLabel);
  });

  it('should be disabled if isDisabled passed', async () => {
    render(
      <Radio value="test" isDisabled>
        test
      </Radio>
    );

    const radio = await screen.findByRole('radio');
    expect(radio).toBeDisabled();

    const radioLabel = await screen.findByText('test');
    expect(radioLabel).toHaveAttribute('data-disabled', 'true');
  });
});
