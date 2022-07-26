import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { CloseIconButton } from '../CloseIconButton';

const testId = 'closeIconButtonId';

describe('CloseIconButton component', () => {
  it('should render', async () => {
    render(<CloseIconButton testId={testId} />);

    const closeIconButton = (await screen.findByTestId(
      testId
    )) as HTMLAnchorElement;
    expect(closeIconButton.nodeName).toBe('A');
  });

  it('can render a classname', async () => {
    const className = 'my-close-button';
    render(<CloseIconButton className={className} testId={testId} />);

    const closeIconButton = (await screen.findByTestId(
      testId
    )) as HTMLAnchorElement;
    expect(closeIconButton.className).toContain(className);
  });
});
