import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { Table } from '../Table';
import { TableFoot } from '../TableFoot';

describe('TableFoot primitive', () => {
  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLTableSectionElement>();
    render(
      <Table>
        <TableFoot testId="testId" ref={ref} />
      </Table>
    );

    await screen.findByTestId('testId');
    expect(ref.current.nodeName).toBe('TFOOT');
  });
});
