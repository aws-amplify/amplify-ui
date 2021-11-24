import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { Table } from '../Table';
import { TableHead } from '../TableHead';

describe('TableHead primitive', () => {
  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLTableSectionElement>();
    render(
      <Table>
        <TableHead testId="testId" ref={ref} />
      </Table>
    );

    await screen.findByTestId('testId');
    expect(ref.current.nodeName).toBe('THEAD');
  });
});
