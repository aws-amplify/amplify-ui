import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { Table } from '../Table';
import { TableBody } from '../TableBody';
import { TableCell } from '../TableCell';
import { TableRow } from '../TableRow';

describe('TableCell primitive', () => {
  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLTableCellElement>();
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell testId="testId" ref={ref} />
          </TableRow>
        </TableBody>
      </Table>
    );

    await screen.findByTestId('testId');
    expect(ref.current.nodeName).toBe('TD');
  });
});
