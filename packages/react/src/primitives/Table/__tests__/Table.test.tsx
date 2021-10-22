import { render, screen } from '@testing-library/react';

import { Table } from '../Table';
import { ComponentClassNames } from '../../shared';
import { TableProps } from '../../types';

describe('Table primitive', () => {
  const testCaption = 'test-caption';
  const testSummary = 'test-summary';

  const setup = async ({ name = 'table', ...rest }: TableProps = {}) => {
    render(<Table name={name} {...rest} />);

    return {
      $table: await screen.findByRole('table'),
    };
  };

  describe('Accessibility', () => {
    it('should render a table with an accessible role', async () => {
      const { $table } = await setup({ name: 'accessible-table' });

      expect($table).toBeDefined();
    });

    it('should render a table with an accessible label', async () => {
      const accessibleLabel = 'accessible-label';
      const { $table } = await setup({ label: accessibleLabel });

      expect($table).toHaveAttribute('aria-label', accessibleLabel);
    });
  });

  describe('Styling and attributes', () => {
    it('should render Table with default and custom class names', async () => {
      const customClassName = 'custom-class';
      const { $table } = await setup({ className: customClassName });

      expect($table).toHaveClass(ComponentClassNames.Table, customClassName);
    });

    it('should render a provided summary with default class name', async () => {
      await setup({ caption: testCaption, summary: testSummary });

      const $testSummary = screen.getByText(testSummary);

      expect($testSummary).toHaveClass(ComponentClassNames.TableSummary);
    });

    it('should allow for custom style props', async () => {
      const customStyle = { border: '1px solid black' };
      const { $table } = await setup({ style: customStyle });

      expect($table).toHaveStyle(customStyle);
    });
  });

  describe('Functionality', () => {
    it('should render provided caption and summary for the Table', async () => {
      await setup({
        caption: testCaption,
        summary: testSummary,
      });

      expect(screen.getByText(testCaption)).toBeDefined();
      expect(screen.getByText(testSummary)).toBeDefined();
    });
  });
});
