import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { Table } from '../Table';
import { TableRow } from '../TableRow';

describe('Forward ref: ', () => {
  it('should forward ref to TableRow DOM element', async () => {
    const ref = React.createRef<HTMLTableRowElement>();
    render(
      <Table>
        <TableRow ref={ref} />
      </Table>
    );

    await screen.findByRole('row');
    expect(ref.current.nodeName).toBe('TR');
  });
});
