import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { elementsDefault } from '../defaults';
import { ButtonElementVariant } from '../definitions';
import { createStorageBrowser } from '../../../createStorageBrowser';

const TEST_ELEMENTS = Object.entries(elementsDefault).filter(
  ([name]) => !name.startsWith('Table')
);

const BUTTON_VARIANTS: [ButtonElementVariant, string[]][] = [
  ['menu-item', ['amplify-button--link']],
  ['menu-toggle', ['amplify-button--link']],
  ['action-submit', []],
  ['cancel', ['amplify-button--link', 'amplify-button--link--error']],
  ['download', ['amplify-button--link']],
  ['exit', ['amplify-button--link']],
  ['message-dismiss', ['amplify-button--link--overlay']],
  ['navigate', ['amplify-button--link']],
  ['primary', ['amplify-button--primary']],
  ['refresh', ['amplify-button--link']],
  ['search-submit', []],
  ['sort', ['amplify-button--link']],
  ['table-data', ['amplify-button--link']],
];

const VIEW_VARIANTS: [string, string[]][] = [
  ['actions-menu-list', []],
  ['info', ['amplify-message--info']],
  ['warning', ['amplify-message--warning']],
  ['success', ['amplify-message--success']],
  ['error', ['amplify-message--error']],
];

const config = {
  accountId: '012345678901',
  getLocationCredentials: jest.fn(),
  listLocations: jest.fn(),
  region: 'region',
  registerAuthListener: jest.fn(),
};

describe('elementsDefault', () => {
  it('should render the elementsDefault when used', async () => {
    const { StorageBrowser } = createStorageBrowser({
      elements: elementsDefault,
      config,
    });

    render(<StorageBrowser />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Home' })).toBeInTheDocument();
    });

    const refresh = screen.getByRole('button', { name: 'Refresh data' });

    expect(refresh.classList).toContain('amplify-button');
  });

  it.each(TEST_ELEMENTS)('should render %s', async (name, Element) => {
    render(<Element testId={name} />);

    const result = await screen.findByTestId(name);
    expect(result).toBeInTheDocument();
  });

  it.each(BUTTON_VARIANTS)(
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

  it.each(VIEW_VARIANTS)(
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
    const { Heading } = elementsDefault;
    render(<Heading />);
    const heading = screen.getByRole('heading');
    expect(heading.classList).toContain('amplify-heading');
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
    const {
      Table,
      TableHead,
      TableHeader,
      TableBody,
      TableDataCell,
      TableRow,
    } = elementsDefault;
    render(
      <Table testId="Table">
        <TableHead testId="TableHead">
          <TableRow testId="TableRow">
            <TableHeader testId="TableHeader">Head</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody testId="TableBody">
          <TableRow>
            <TableDataCell testId="TableDataCell">Body</TableDataCell>
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
