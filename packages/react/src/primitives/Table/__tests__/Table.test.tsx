import { render, screen } from '@testing-library/react';

import { Table } from '../Table';
import { ComponentClassNames } from '../../shared';
import { TableProps } from '../../types';

describe('Table primitive', () => {
  const testCaption = 'test-caption';
  const testSummary = 'test-summary';

  const setup = async ({ name = 'table', ...rest }: TableProps = {}) => {
    await render(<Table name={name} {...rest} />);

    return {
      $table: await screen.findByRole('table', { name: new RegExp(name, 'i') }),
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

    it('should render a provided caption and summary with default class names', async () => {
      await setup({ summary: testSummary });
      const $testSummary = screen.getByText(testSummary);

      expect($testSummary).toHaveClass(ComponentClassNames.TableSummary);
    });

    it('should have the "data-highlightonhover" attribute when set', async () => {
      const { $table } = await setup({ highlightOnHover: true });

      expect($table).toHaveAttribute('data-highlightonhover');
    });

    it('should have default the "data-size" attribute of "large"', async () => {
      const { $table } = await setup();

      expect($table).toHaveAttribute('data-size', 'large');
    });

    it('should allow the "data-size" attribute to be set', async () => {
      const setSize = 'small';
      const { $table } = await setup({ size: setSize });

      expect($table).toHaveAttribute('data-size', setSize);
    });

    it('should have the default "data-variation" attribute of "bordered"', async () => {
      const { $table } = await setup();

      expect($table).toHaveAttribute('data-variation', 'bordered');
    });

    it('should allow the "data-variation" attribute to be set', async () => {
      const setVariation = 'striped';
      const { $table } = await setup({ variation: setVariation });

      expect($table).toHaveAttribute('data-variation', setVariation);
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
