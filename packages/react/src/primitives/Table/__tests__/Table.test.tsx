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
import { ComponentClassNames } from '../../shared';
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

      expect($table).toHaveClass(ComponentClassNames.Table, testClass);
    });

    it('should render TableHead with default class name', async () => {
      const { $header } = await setup();

      expect($header).toHaveClass(ComponentClassNames.TableHead);
    });

    it('should render TableBody with default class name', async () => {
      const { $body } = await setup();

      expect($body).toHaveClass(ComponentClassNames.TableBody);
    });

    it('should render TableFoot with default class name', async () => {
      const { $footer } = await setup();

      expect($footer).toHaveClass(ComponentClassNames.TableFoot);
    });

    it('should render TableRow with default class name', async () => {
      const { $bodyRow, $footerRow, $headerRow } = await setup();

      expect($bodyRow).toHaveClass(ComponentClassNames.TableRow);
      expect($footerRow).toHaveClass(ComponentClassNames.TableRow);
      expect($headerRow).toHaveClass(ComponentClassNames.TableRow);
    });

    it('should render TableCell header with default class name', async () => {
      const { $headerCell } = await setup();

      expect($headerCell).toHaveClass(ComponentClassNames.TableTh);
    });

    it('should render TableCell data with default class name', async () => {
      const { $bodyCell, $footerCell } = await setup();

      expect($bodyCell).toHaveClass(ComponentClassNames.TableTd);
      expect($footerCell).toHaveClass(ComponentClassNames.TableTd);
    });

    it('should render a caption with default class name', async () => {
      await setup({ caption: testCaption });

      const $caption = await screen.getByText(testCaption);

      expect($caption).toHaveClass(ComponentClassNames.TableCaption);
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

  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLTableElement>();
    render(<Table testId="testId" ref={ref} />);

    await screen.findByTestId('testId');
    expect(ref.current.nodeName).toBe('TABLE');
  });
});
