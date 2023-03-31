import * as React from 'react';
import { render } from '@testing-library/react';

import { FieldDescription, QA_FIELD_DESCRIPTION } from '../FieldDescription';
import { ComponentClassNames } from '../../shared/constants';

describe('FieldDescription component', () => {
  it('should render if it has a "labelHidden" prop is `true`, as long as there\'s descriptiveText', () => {
    const { queryByTestId } = render(
      <FieldDescription labelHidden>some description</FieldDescription>
    );
    const descriptionElement = queryByTestId(QA_FIELD_DESCRIPTION);
    expect(descriptionElement).toHaveClass(ComponentClassNames.VisuallyHidden);
  });

  it('should not be hidden if it has a "labelHidden" prop is `false`', () => {
    const { getByTestId } = render(
      <FieldDescription labelHidden={false}>some description</FieldDescription>
    );
    const descriptionElement = getByTestId(QA_FIELD_DESCRIPTION);
    expect(descriptionElement).not.toHaveClass(
      ComponentClassNames.VisuallyHidden
    );
  });

  it("should not render if there's no descriptiveText", () => {
    const { queryByTestId } = render(<FieldDescription labelHidden />);
    const descriptionElement = queryByTestId(QA_FIELD_DESCRIPTION);
    expect(descriptionElement).toBeNull();
  });
});
