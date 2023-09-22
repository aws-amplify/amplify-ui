import * as React from 'react';
import { render } from '@testing-library/react';

import { FieldDescription, QA_FIELD_DESCRIPTION } from '../FieldDescription';
import { ComponentClassName } from '@aws-amplify/ui';

describe('FieldDescription component', () => {
  it('should render if it has a "labelHidden" prop is `true`, as long as there\'s descriptiveText', () => {
    const { queryByTestId } = render(
      <FieldDescription descriptiveText="some description" labelHidden />
    );
    const descriptionElement = queryByTestId(QA_FIELD_DESCRIPTION);
    expect(descriptionElement).toHaveClass(ComponentClassName.VisuallyHidden);
  });

  it('should not be hidden if it has a "labelHidden" prop is `false`', () => {
    const { getByTestId } = render(
      <FieldDescription
        descriptiveText="some description"
        labelHidden={false}
      />
    );
    const descriptionElement = getByTestId(QA_FIELD_DESCRIPTION);
    expect(descriptionElement).not.toHaveClass(
      ComponentClassName.VisuallyHidden
    );
  });

  it("should not render if there's no descriptiveText", () => {
    const { queryByTestId } = render(
      <FieldDescription descriptiveText="" labelHidden />
    );
    const descriptionElement = queryByTestId(QA_FIELD_DESCRIPTION);
    expect(descriptionElement).toBeNull();
  });
});
