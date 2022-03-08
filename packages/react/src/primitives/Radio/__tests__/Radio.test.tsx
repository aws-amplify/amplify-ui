import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { Radio } from '../Radio';
import { RadioGroupField } from '../../RadioGroupField';
import { View } from '../../View';
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

  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLInputElement>();
    render(
      <Radio id="test" value="test" ref={ref}>
        test
      </Radio>
    );

    await screen.findByRole('radio');
    expect(ref.current.nodeName).toBe('INPUT');
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

  it('should have no default labelPosition', async () => {
    render(
      <View testId="test">
        <Radio value="test">test</Radio>
      </View>
    );
    const view = await screen.findByTestId('test');
    expect(view.querySelector('label')).not.toHaveAttribute(
      'data-label-position'
    );
  });

  it('should work with labelPosition', async () => {
    render(
      <View testId="test">
        <Radio value="test" labelPosition="end">
          test
        </Radio>
      </View>
    );
    const radioField = await screen.findByTestId('test');
    expect(radioField.querySelector('label')).toHaveAttribute(
      'data-label-position',
      'end'
    );
  });

  it('should inherit labelPosition from RadioGroupField', async () => {
    render(
      <RadioGroupField
        label="label"
        name="label"
        labelPosition="end"
        testId="test"
      >
        <Radio value="test">test</Radio>
      </RadioGroupField>
    );
    const radioField = await screen.findByTestId('test');
    expect(radioField.querySelector('.amplify-radio')).toHaveAttribute(
      'data-label-position',
      'end'
    );
  });

  it('should not inherit labelPosition from RadioGroupField', async () => {
    render(
      <RadioGroupField
        label="label"
        name="label"
        labelPosition="end"
        testId="test"
      >
        <Radio value="test" labelPosition="start">
          test
        </Radio>
      </RadioGroupField>
    );
    const radioField = await screen.findByTestId('test');
    expect(radioField.querySelector('.amplify-radio')).toHaveAttribute(
      'data-label-position',
      'start'
    );
  });
});
