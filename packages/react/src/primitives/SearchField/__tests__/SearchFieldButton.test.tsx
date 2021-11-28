import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { ComponentClassNames } from '../../shared';
import { SearchFieldButton } from '../SearchFieldButton';

import { SharedText } from '../../shared/i18n';

const ariaLabelText = SharedText.SearchField.ariaLabel.search;

describe('SearchFieldButton component', () => {
  const testId = 'testId';

  it('should render default classname for SearchFieldButton', async () => {
    render(<SearchFieldButton />);

    const button = await screen.findByRole('button');

    expect(button).toHaveClass(ComponentClassNames.SearchFieldSearch);
  });

  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<SearchFieldButton ref={ref} />);

    await screen.findByRole('button');

    expect(ref.current.nodeName).toBe('BUTTON');
  });

  it('should set correct ariaLabel', async () => {
    render(<SearchFieldButton />);

    const button = await screen.findByLabelText(ariaLabelText);

    expect(button).not.toBeNull();
  });
});
