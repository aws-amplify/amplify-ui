import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ComponentClassNames } from '../../shared';
import { ToggleButton } from '../../ToggleButton';
import { ToggleButtonGroup } from '../ToggleButtonGroup';

describe('ToggleButtonGroup test suite', () => {
  const MultipleSelectionGroup = () => {
    const [value, setValue] = useState(['test-button-1']);
    return (
      <ToggleButtonGroup
        onChange={(e, value: string[]) => setValue(value)}
        value={value}
      >
        <ToggleButton value="test-button-1" />
        <ToggleButton value="test-button-2" />
        <ToggleButton value="test-button-3" />
      </ToggleButtonGroup>
    );
  };

  const ExclusiveSelectionGroup = () => {
    const [value, setValue] = useState('test-button-1');
    return (
      <ToggleButtonGroup
        onChange={(e, value: string) => setValue(value)}
        value={value}
        isExclusive
      >
        <ToggleButton value="test-button-1" />
        <ToggleButton value="test-button-2" />
        <ToggleButton value="test-button-3" />
      </ToggleButtonGroup>
    );
  };

  it('should set basic props for both group and child button correctly', async () => {
    const testLabel = 'test-label';
    const testClass = 'test-class';
    const size = 'large';
    const variation = 'primary';
    const onChange = jest.fn();
    render(
      <ToggleButtonGroup
        ariaLabel={testLabel}
        className={testClass}
        onChange={onChange}
        value="test-button"
        size={size}
        variation={variation}
        isExclusive
      >
        <ToggleButton value="test-button" />
      </ToggleButtonGroup>
    );
    const toggleButtonGroup = await screen.findByRole('group');
    expect(toggleButtonGroup).toHaveClass(
      ComponentClassNames.ToggleButtonGroup,
      testClass
    );
    expect(toggleButtonGroup).toHaveAttribute('aria-label', testLabel);

    const toggleButton = await screen.findByRole('button');
    expect(toggleButton).toHaveAttribute('data-size', size);
    expect(toggleButton).toHaveAttribute('data-variation', variation);
    userEvent.click(toggleButton);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should works in multiple selection way', async () => {
    render(<MultipleSelectionGroup />);
    const toggleButtons = await screen.findAllByRole('button');
    expect(toggleButtons[0]).toHaveAttribute('aria-pressed', 'true');
    expect(toggleButtons[1]).toHaveAttribute('aria-pressed', 'false');
    expect(toggleButtons[2]).toHaveAttribute('aria-pressed', 'false');

    userEvent.click(toggleButtons[1]);
    expect(toggleButtons[0]).toHaveAttribute('aria-pressed', 'true');
    expect(toggleButtons[1]).toHaveAttribute('aria-pressed', 'true');
    expect(toggleButtons[2]).toHaveAttribute('aria-pressed', 'false');

    userEvent.click(toggleButtons[2]);
    expect(toggleButtons[0]).toHaveAttribute('aria-pressed', 'true');
    expect(toggleButtons[1]).toHaveAttribute('aria-pressed', 'true');
    expect(toggleButtons[2]).toHaveAttribute('aria-pressed', 'true');
  });

  it('should works in multiple selection way', async () => {
    render(<ExclusiveSelectionGroup />);
    const toggleButtons = await screen.findAllByRole('button');
    expect(toggleButtons[0]).toHaveAttribute('aria-pressed', 'true');
    expect(toggleButtons[1]).toHaveAttribute('aria-pressed', 'false');
    expect(toggleButtons[2]).toHaveAttribute('aria-pressed', 'false');

    userEvent.click(toggleButtons[1]);
    expect(toggleButtons[0]).toHaveAttribute('aria-pressed', 'false');
    expect(toggleButtons[1]).toHaveAttribute('aria-pressed', 'true');
    expect(toggleButtons[2]).toHaveAttribute('aria-pressed', 'false');

    userEvent.click(toggleButtons[2]);
    expect(toggleButtons[0]).toHaveAttribute('aria-pressed', 'false');
    expect(toggleButtons[1]).toHaveAttribute('aria-pressed', 'false');
    expect(toggleButtons[2]).toHaveAttribute('aria-pressed', 'true');
  });
});
