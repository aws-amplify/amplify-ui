import React from 'react';
import { render, screen } from '@testing-library/react';
import { elementsDefault } from '../defaults';
import { ButtonElementVariant } from '../definitions';

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
  ['paginate-current', ['amplify-button--link']],
  ['paginate-next', ['amplify-button--link']],
  ['paginate-previous', ['amplify-button--link']],
];

const VIEW_VARIANTS: [string, string[]][] = [
  ['actions-menu-list', []],
  ['info', ['amplify-message--info']],
  ['warning', ['amplify-message--warning']],
  ['success', ['amplify-message--success']],
  ['error', ['amplify-message--error']],
  ['menu-list', []],
  ['empty-message', ['amplify-message--neutral']],
];

describe('elementsDefault', () => {
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

  it('should render checkbox input', () => {
    const { Input } = elementsDefault;
    render(<Input type="checkbox" />);
    const input = screen.getByRole('checkbox');
    expect(input).toBeInTheDocument();
  });

  it('should render DescriptionTerm', () => {
    const { DescriptionTerm } = elementsDefault;
    render(<DescriptionTerm testId="dt">Term</DescriptionTerm>);
    const dt = screen.getByTestId('dt');
    expect(dt).toBeInTheDocument();
  });

  it('should render Nav', () => {
    const { Nav } = elementsDefault;
    render(<Nav testId="nav">Navigation</Nav>);
    const nav = screen.getByTestId('nav');
    expect(nav).toBeInTheDocument();
  });

  it('should render Span variants', () => {
    const { Span } = elementsDefault;
    render(
      <Span variant="navigation-text" testId="nav-text">
        Nav
      </Span>
    );
    render(
      <Span variant="destination-text" testId="dest-text">
        Dest
      </Span>
    );
    render(<Span testId="default-span">Default</Span>);
    expect(screen.getByTestId('nav-text')).toBeInTheDocument();
    expect(screen.getByTestId('dest-text')).toBeInTheDocument();
    expect(screen.getByTestId('default-span')).toBeInTheDocument();
  });

  it('should render Text variants', () => {
    const { Text } = elementsDefault;
    render(
      <Text variant="field-error" testId="error-text">
        Error
      </Text>
    );
    render(<Text testId="default-text">Default</Text>);
    expect(screen.getByTestId('error-text')).toBeInTheDocument();
    expect(screen.getByTestId('default-text')).toBeInTheDocument();
  });

  it('should render View menu-list variant', () => {
    const { View } = elementsDefault;
    render(
      <View variant="menu-list" testId="menu-list">
        Menu
      </View>
    );
    expect(screen.getByTestId('menu-list')).toBeInTheDocument();
  });

  it('should render View empty-message variant', () => {
    const { View } = elementsDefault;
    render(
      <View variant="empty-message" testId="empty">
        Empty
      </View>
    );
    expect(screen.getByTestId('empty')).toBeInTheDocument();
  });

  it('should render Button paginate variants', () => {
    const { Button } = elementsDefault;
    render(<Button variant="paginate-current">Current</Button>);
    render(<Button variant="paginate-next">Next</Button>);
    render(<Button variant="paginate-previous">Previous</Button>);
    expect(screen.getByText('Current')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('Previous')).toBeInTheDocument();
  });
});
