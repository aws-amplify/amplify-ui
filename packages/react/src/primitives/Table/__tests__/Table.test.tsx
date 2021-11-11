import { render, screen } from '@testing-library/react';

import { Table } from '../Table';
import { ComponentClassNames } from '../../shared';
import { TableProps } from '../../types';

describe('Table primitive', () => {
  const testCaption = 'test-caption';
  const testSummary = 'test-summary';

  const setup = async (props: TableProps = {}) => {
    render(<Table {...props} />);

    return {
      $table: await screen.findByRole('table'),
    };
  };

  describe('Accessibility', () => {
    it('should render a table with an accessible caption', async () => {
      const caption = 'accessible-caption';
      await setup({ caption });

      expect(screen.findByRole('table', { name: caption })).toBeDefined();
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

    it('should set the data-highlightonhover attribute', async () => {
      const highlightOnHover = true;
      const { $table } = await setup({ highlightOnHover });

      expect($table).toHaveAttribute(
        'data-highlightonhover',
        highlightOnHover.toString()
      );
    });

    it('should set the data-size attribute', async () => {
      const size = 'small';
      const { $table } = await setup({ size });

      expect($table).toHaveAttribute('data-size', size);
    });

    it('should set the data-variation attribute', async () => {
      const variation = 'striped';
      const { $table } = await setup({ variation });

      expect($table).toHaveAttribute('data-variation', variation);
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
