import * as React from 'react';
import { render } from '@testing-library/react';

import { Field } from '../Field';
import { ComponentClassNames } from '../../shared/constants';

describe('Field component', () => {
  it('should match snapshot', () => {
    const { container } = render(
      <Field
        label="label"
        descriptiveText="some description"
        errorMessage="error"
        hasError
      >
        <div>hi</div>
      </Field>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render a label', () => {
    const { getByText } = render(<Field label="label" />);
    const descriptionElement = getByText('label');
    expect(descriptionElement).toHaveClass(ComponentClassNames.Label);
  });

  it('should render descriptive text', () => {
    const { getByText } = render(
      <Field label="label" descriptiveText="description" />
    );
    const descriptionElement = getByText('description');
    expect(descriptionElement).toHaveClass(
      ComponentClassNames.FieldDescription
    );
  });

  it('should render error message', () => {
    const { getByText } = render(
      <Field label="label" errorMessage="error" hasError />
    );
    const descriptionElement = getByText('error');
    expect(descriptionElement).toHaveClass(
      ComponentClassNames.FieldErrorMessage
    );
  });

  it('should render if it has a "labelHidden" prop is `true`, as long as there\'s descriptiveText', () => {
    const { getByText } = render(
      <Field label="label" descriptiveText="some description" labelHidden />
    );
    const descriptionElement = getByText('some description');
    expect(descriptionElement).toHaveClass(ComponentClassNames.VisuallyHidden);
  });

  it('should not be hidden if it has a "labelHidden" prop is `false`', () => {
    const { getByText } = render(
      <Field
        label="label"
        descriptiveText="some description"
        labelHidden={false}
      />
    );
    const descriptionElement = getByText('some description');
    expect(descriptionElement).not.toHaveClass(
      ComponentClassNames.VisuallyHidden
    );
  });
});
