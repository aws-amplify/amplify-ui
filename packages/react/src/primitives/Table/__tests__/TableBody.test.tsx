import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { Table } from '../Table';
import { TableBody } from '../TableBody';

describe('TableBody primitive', () => {
  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLTableSectionElement>();
    render(
      <Table>
        <TableBody testId="testId" ref={ref} />
      </Table>
    );

    await screen.findByTestId('testId');
    expect(ref.current.nodeName).toBe('TBODY');
  });
});
