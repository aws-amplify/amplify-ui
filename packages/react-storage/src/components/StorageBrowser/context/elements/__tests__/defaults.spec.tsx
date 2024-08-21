import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { elementsDefault } from '../defaults';
import { ButtonElementVariant } from '../definitions';
import { createStorageBrowser } from '../../../createStorageBrowser';

describe('elementsDefault', () => {
  it('should render the elementsDefault when used', async () => {
    const listLocations = jest.fn(() =>
      Promise.resolve({ locations: [], nextToken: undefined })
    );
    const config = {
      getLocationCredentials: jest.fn(),
      listLocations,
      region: 'region',
      registerAuthListener: jest.fn(),
    };
    const { StorageBrowser } = createStorageBrowser({
      elements: elementsDefault,
      config,
    });

    render(<StorageBrowser />);
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Home' })).toBeInTheDocument();
    });
    const title = screen.getByRole('heading', { name: 'Home' });
    const refresh = screen.getByRole('button', { name: 'Refresh table' });
    expect(title.classList).toContain('amplify-heading');
    expect(refresh.classList).toContain('amplify-button');
  });

  const elements = Object.entries(elementsDefault).filter(
    ([name]) => !name.startsWith('Table')
  );
  it.each(elements)('should render %s', async (name, Element) => {
    render(<Element testId={name} />);
    const result = await screen.findByTestId(name);
    expect(result).toBeInTheDocument();
  });

  const buttonVariants: [ButtonElementVariant, string[]][] = [
    ['action-select-item', ['amplify-button--link']],
    ['action-select-toggle', ['amplify-button--link']],
    ['action-submit', []],
    ['cancel', ['amplify-button--link', 'amplify-button--link--error']],
    ['download', ['amplify-button--link']],
    ['exit', ['amplify-button--outlined--overlay']],
    ['message-dismiss', ['amplify-button--link--overlay']],
    ['navigate', ['amplify-button--link']],
    ['primary', ['amplify-button--primary']],
    ['refresh', ['amplify-button--link']],
    ['search-submit', []],
    ['sort', ['amplify-button--link']],
    ['table-data', ['amplify-button--link']],
  ];
  it.each(buttonVariants)(
    'should render button variant %s',
    async (variant, expectedClasses) => {
      const { Button } = elementsDefault;
      render(<Button variant={variant} />);
      const result = await screen.findByRole('button');
      expect(result).toBeInTheDocument();
      for (const expectedClass of expectedClasses) {
        expect(result.classList).toContain(expectedClass);
      }
    }
  );

  const viewVariants: [string, string[]][] = [
    ['action-select-menu', []],
    ['info', ['amplify-message--info']],
    ['warning', ['amplify-message--warning']],
    ['success', ['amplify-message--success']],
    ['error', ['amplify-message--error']],
  ];
  it.each(viewVariants)(
    'should render view variant %s',
    async (variant, expectedClasses) => {
      const { View } = elementsDefault;
      render(<View testId="view" variant={variant} />);
      const result = await screen.findByTestId('view');
      expect(result).toBeInTheDocument();
      for (const expectedClass of expectedClasses) {
        expect(result.classList).toContain(expectedClass);
      }
    }
  );

  it('should render the Title with Amplify UI styles', () => {
    const { Title } = elementsDefault;
    render(<Title />);
    const title = screen.getByRole('heading');
    expect(title.classList).toContain('amplify-heading');
  });

  it('should render the Label with Amplify UI styles', () => {
    const { Label } = elementsDefault;
    const { container } = render(<Label></Label>);
    const label = container.querySelector('label');
    expect(label?.classList).toContain('amplify-label');
  });

  it('should render the Input with Amplify UI styles', () => {
    const { Input } = elementsDefault;
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input.classList).toContain('amplify-input');
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
    const table = screen.getByRole('table');
    expect(table.classList).toContain('amplify-table');
  });
});
