import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { FieldDescription, QA_FIELD_DESCRIPTION } from '../FieldDescription';
import { ComponentClassNames } from '../../shared/constants';

describe('FieldDescription component', () => {
  const renderFieldDescriptionComponent = ({
    descriptiveText,
    labelHidden,
    ...rest
  }) =>
    render(
      <FieldDescription
        descriptiveText={descriptiveText}
        labelHidden={labelHidden}
        {...rest}
      />
    );

  it('should be hidden if it has a "labelHidden" prop is `true`', async () => {
    const { getByTestId } = render(
      <FieldDescription descriptiveText="" labelHidden={true} />
    );
    const descriptionElement = getByTestId(QA_FIELD_DESCRIPTION);
    expect(descriptionElement).toHaveClass(ComponentClassNames.VisuallyHidden);
  });
  it('should not be hidden if it has a "labelHidden" prop is `false`', async () => {
    const { getByTestId } = render(
      <FieldDescription descriptiveText="" labelHidden={false} />
    );
    const descriptionElement = getByTestId(QA_FIELD_DESCRIPTION);
    expect(descriptionElement).not.toHaveClass(
      ComponentClassNames.VisuallyHidden
    );
  });
});
