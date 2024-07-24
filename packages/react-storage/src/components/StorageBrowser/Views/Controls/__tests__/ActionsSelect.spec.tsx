import React from 'react';
import { render, screen } from '@testing-library/react';
import { ActionSelectControl } from '../ActionSelect';

describe('ActionSelectControl', () => {
  it('renders a `ActionSelectControl`', () => {
    render(<ActionSelectControl />);
    const toggle = screen.getByRole('button', { name: 'Actions' });
    const menu = screen.getByRole('menu', {
      name: 'Actions',
    });
    expect(menu).toBeInTheDocument();
    expect(toggle).toBeInTheDocument();
  });

  it('renders an `ActionItem`', () => {
    render(
      <ActionSelectControl.ActionsMenu.ActionItem
        action={{ displayName: 'Upload folder', type: 'FOLDER' }}
      />
    );
    const actionItem = screen.getByRole('menuitem', { name: 'Upload folder' });

    expect(actionItem).toBeInTheDocument();
  });

  it('renders an `ActionItem with no variant`', () => {
    render(
      <ActionSelectControl.ActionsMenu.ActionItem
        action={{ displayName: 'Upload folder', type: 'FOLDER' }}
      />
    );
    const actionItem = screen.getByRole('menuitem', { name: 'Upload folder' });
    const svg = actionItem.querySelector('svg');
    expect(svg).not.toBeInTheDocument();
  });
});
