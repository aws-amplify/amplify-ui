import React from 'react';
import { render, screen } from '@testing-library/react';
import { elementsDefault } from '../defaults';
import { ButtonElementVariant } from '../definitions';

describe('elementsDefault', () => {
  const elements = Object.entries(elementsDefault).filter(
    ([name]) => !name.startsWith('Table')
  );
  it.each(elements)('should render %s', async (name, Element) => {
    render(<Element testId={name} />);
    const result = await screen.findByTestId(name);
    expect(result).toBeInTheDocument();
  });

  const buttonVariants: ButtonElementVariant[] = [
    'action-select-item',
    'action-select-toggle',
    'action-submit',
    'cancel',
    'download',
    'exit',
    'message-dismiss',
    'navigate',
    'primary',
    'refresh',
    'search-submit',
    'sort',
    'table-data',
  ];
  it.each(buttonVariants)(
    'should render button variant %s',
    async (variant) => {
      const { Button } = elementsDefault;
      render(<Button variant={variant} />);
      const result = await screen.findByRole('button');
      expect(result).toBeInTheDocument();
    }
  );

  const viewVariants = [
    'action-select-menu',
    'info',
    'warning',
    'success',
    'error',
  ];
  it.each(viewVariants)('should render view variant %s', async (variant) => {
    const { View } = elementsDefault;
    render(<View testId="view" variant={variant} />);
    const result = await screen.findByTestId('view');
    expect(result).toBeInTheDocument();
  });

  it('should render table components', async () => {
    const { Table, TableHead, TableHeader, TableBody, TableData, TableRow } =
      elementsDefault;
    render(
      <Table testId="Table">
        <TableHead testId="TableHead">
          <TableRow testId="TableRow">
            <TableHeader testId="TableHeader">Head</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody testId="TableBody">
          <TableRow>
            <TableData testId="TableData">Body</TableData>
          </TableRow>
        </TableBody>
      </Table>
    );
    const elementNames = Object.keys(elementsDefault).filter((name) =>
      name.startsWith('Table')
    );
    for (const elementName of elementNames) {
      const result = await screen.findByTestId(elementName);
      expect(result).toBeInTheDocument();
    }
  });
});
