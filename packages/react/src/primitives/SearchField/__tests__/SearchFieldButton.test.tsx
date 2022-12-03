import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { SearchFieldButton } from '../SearchFieldButton';
import { ComponentClassNames, ComponentText } from '../../shared/constants';

const ariaLabelText = ComponentText.SearchField.searchButtonLabel;

describe('SearchFieldButton component', () => {
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
