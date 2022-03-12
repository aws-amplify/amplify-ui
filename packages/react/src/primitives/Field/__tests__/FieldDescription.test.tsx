import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { FieldDescription, QA_FIELD_DESCRIPTION } from '../FieldDescription';
import { ComponentClassNames } from '../../shared/constants';

describe('FieldDescription component', () => {
  it('should render if it has a "labelHidden" prop is `true`, as long as there\'s descriptiveText', async () => {
    const { queryByTestId } = render(
      <FieldDescription descriptiveText="some description" labelHidden={true} />
    );
    const descriptionElement = queryByTestId(QA_FIELD_DESCRIPTION);
    expect(descriptionElement).toHaveClass(ComponentClassNames.VisuallyHidden);
  });

  it('should not be hidden if it has a "labelHidden" prop is `false`', async () => {
    const { getByTestId } = render(
      <FieldDescription
        descriptiveText="some description"
        labelHidden={false}
      />
    );
    const descriptionElement = getByTestId(QA_FIELD_DESCRIPTION);
    expect(descriptionElement).not.toHaveClass(
      ComponentClassNames.VisuallyHidden
    );
  });

  it("should not render if there's no descriptiveText", async () => {
    const { queryByTestId } = render(
      <FieldDescription descriptiveText="" labelHidden={true} />
    );
    const descriptionElement = queryByTestId(QA_FIELD_DESCRIPTION);
    expect(descriptionElement).toBeNull();
  });
});
