import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { Toast } from '../Toast';
import { LivenessClassNames } from '../../types/classNames';

describe('Toast', () => {
  it('should render the component content appropriately', () => {
    render(<Toast>{'anything'}</Toast>);

    expect(screen.getByText('anything')).toBeInTheDocument();
  });

  it('can render Toast variations', async () => {
    render(
      <div>
        <Toast testId="defaultToast">Default</Toast>
        <Toast variation="primary" testId="primaryToast">
          Primary
        </Toast>
        <Toast variation="error" testId="errorToast">
          Error
        </Toast>
      </div>
    );

    const defaultToast = await screen.findByTestId('defaultToast');
    const primaryToast = await screen.findByTestId('primaryToast');
    const errorToast = await screen.findByTestId('errorToast');

    expect(defaultToast.classList).toContain(
      `${LivenessClassNames.Toast}--default`
    );
    expect(primaryToast.classList).toContain(
      `${LivenessClassNames.Toast}--primary`
    );
    expect(errorToast.classList).toContain(
      `${LivenessClassNames.Toast}--error`
    );
  });

  it('can render Toast sizes', async () => {
    render(
      <div>
        <Toast testId="mediumToast">Medium</Toast>
        <Toast size="large" testId="largeToast">
          Large
        </Toast>
      </div>
    );

    const mediumToast = await screen.findByTestId('mediumToast');
    const largeToast = await screen.findByTestId('largeToast');

    expect(mediumToast.classList).toContain(
      `${LivenessClassNames.Toast}--medium`
    );
    expect(largeToast.classList).toContain(
      `${LivenessClassNames.Toast}--large`
    );
  });
});
