import * as React from 'react';
import { render, screen } from '@testing-library/react';

import {
  Table,
  TableBody,
  TableCell,
  TableFoot,
  TableHead,
  TableRow,
} from '..';
import { ComponentClassName } from '@aws-amplify/ui';
import { TableProps } from '../../types';

describe('Table primitive', () => {
  const testCaption = 'test-caption';
  const testClass = 'test-class';

  const HEADER_TEXT = 'Header';
  const BODY_TEXT = 'Body';
  const FOOTER_TEXT = 'Footer';

  const setup = async (props: TableProps = {}) => {
    render(
      <Table {...props}>
        <TableHead>
          <TableRow>
            <TableCell as="th">{HEADER_TEXT}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{BODY_TEXT}</TableCell>
          </TableRow>
        </TableBody>
        <TableFoot>
          <TableRow>
            <TableCell>{FOOTER_TEXT}</TableCell>
          </TableRow>
        </TableFoot>
      </Table>
    );

    return {
      $body: (await screen.findAllByRole('rowgroup'))[1],
      $bodyCell: await screen.findByRole('cell', { name: BODY_TEXT }),
      $bodyRow: (await screen.findAllByRole('row'))[1],
      $footer: (await screen.findAllByRole('rowgroup'))[2],
      $footerCell: await screen.findByRole('cell', { name: FOOTER_TEXT }),
      $footerRow: (await screen.findAllByRole('row'))[2],
      $header: (await screen.findAllByRole('rowgroup'))[0],
      $headerCell: await screen.findByRole('columnheader', {
        name: HEADER_TEXT,
      }),
      $headerRow: (await screen.findAllByRole('row'))[0],
      $table: await screen.findByRole('table'),
    };
  };

  describe('Accessibility', () => {
    it('should render table elements with accessible roles', async () => {
      const $tableElements = await setup();

      Object.values($tableElements).forEach(($tableElement) =>
        expect($tableElement).toBeDefined()
      );
    });

    it('should render a table with an accessible caption', async () => {
      await setup({ caption: testCaption });

      const $accessibleTable = await screen.findByRole('table', {
        name: testCaption,
      });

      expect($accessibleTable).toBeDefined();
    });
  });

  describe('Styling and attributes', () => {
    it('should render Table with default and custom class names', async () => {
      const { $table } = await setup({ className: testClass });

      expect($table).toHaveClass(ComponentClassName.Table, testClass);
    });

    it('should render size classes for Table', async () => {
      render(
        <div>
          <Table testId="small" size="small" />
          <Table testId="large" size="large" />
        </div>
      );

      const small = await screen.findByTestId('small');
      const large = await screen.findByTestId('large');

      expect(small.classList).toContain(
        `${ComponentClassName['Table']}--small`
      );
      expect(large.classList).toContain(
        `${ComponentClassName['Table']}--large`
      );
    });

    it('should render variation classes for Table', async () => {
      render(
        <div>
          <Table testId="striped" variation="striped" />
          <Table testId="bordered" variation="bordered" />
        </div>
      );

      const striped = await screen.findByTestId('striped');
      const bordered = await screen.findByTestId('bordered');

      expect(striped.classList).toContain(
        `${ComponentClassName['Table']}--striped`
      );
      expect(bordered.classList).toContain(
        `${ComponentClassName['Table']}--bordered`
      );
    });

    it('should render TableHead with default class name', async () => {
      const { $header } = await setup();

      expect($header).toHaveClass(ComponentClassName.TableHead);
    });

    it('should render TableBody with default class name', async () => {
      const { $body } = await setup();

      expect($body).toHaveClass(ComponentClassName.TableBody);
    });

    it('should render TableFoot with default class name', async () => {
      const { $footer } = await setup();

      expect($footer).toHaveClass(ComponentClassName.TableFoot);
    });

    it('should render TableRow with default class name', async () => {
      const { $bodyRow, $footerRow, $headerRow } = await setup();

      expect($bodyRow).toHaveClass(ComponentClassName.TableRow);
      expect($footerRow).toHaveClass(ComponentClassName.TableRow);
      expect($headerRow).toHaveClass(ComponentClassName.TableRow);
    });

    it('should render TableCell header with default class name', async () => {
      const { $headerCell } = await setup();

      expect($headerCell).toHaveClass(ComponentClassName.TableTh);
    });

    it('should render TableCell data with default class name', async () => {
      const { $bodyCell, $footerCell } = await setup();

      expect($bodyCell).toHaveClass(ComponentClassName.TableTd);
      expect($footerCell).toHaveClass(ComponentClassName.TableTd);
    });

    it('should render a caption with default class name', async () => {
      await setup({ caption: testCaption });

      const $caption = screen.getByText(testCaption);

      expect($caption).toHaveClass(ComponentClassName.TableCaption);
    });

    it('should set the data-highlightonhover attribute', async () => {
      const highlightOnHover = true;
      const { $table } = await setup({ highlightOnHover });

      expect($table).toHaveAttribute(
        'data-highlightonhover',
        highlightOnHover.toString()
      );
    });

    it('should set the size modifier', async () => {
      const size = 'small';
      const { $table } = await setup({ size });

      expect($table).toHaveClass(`${ComponentClassName['Table']}--${size}`);
    });

    it('should set the variation modifier', async () => {
      const variation = 'striped';
      const { $table } = await setup({ variation });

      expect($table).toHaveClass(
        `${ComponentClassName['Table']}--${variation}`
      );
    });
  });

  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLTableElement>();
    render(<Table testId="testId" ref={ref} />);

    await screen.findByTestId('testId');
    expect(ref.current?.nodeName).toBe('TABLE');
  });
});
