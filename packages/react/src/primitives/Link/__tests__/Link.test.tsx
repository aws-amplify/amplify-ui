import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ComponentClassNames } from '../../shared';
import { Link } from '../Link';
import { Text } from '../../Text/Text';
import { Flex } from '../../Flex';
import { Heading } from '../../Heading';

import {
  BrowserRouter as Router,
  Link as ReactRouterLink,
  Routes,
  Route,
} from 'react-router-dom';

function SampleRoutingApp() {
  return (
    <Router>
      <Flex>
        <Link as={ReactRouterLink} to="/">
          Home
        </Link>
        <Link as={ReactRouterLink} to="/about">
          About
        </Link>
      </Flex>

      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

function Home() {
  return <Heading level={2}>You are home</Heading>;
}

function About() {
  return <Heading level={2}>You are on the about page</Heading>;
}

describe('Link: ', () => {
  const linkText = 'My Link';

  it('renders correct defaults', async () => {
    render(<Link>{linkText}</Link>);

    const link = await screen.findByText(linkText);
    expect(link).toContainHTML(linkText);
    expect(link.nodeName).toBe('A');
    expect(link).toHaveClass(ComponentClassNames.Link);
  });

  it('can render a classname for Link', async () => {
    render(<Link className="my-link">{linkText}</Link>);

    const link = await screen.findByText(linkText);
    expect(link.className).toContain('my-link');
  });

  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLAnchorElement>();
    render(<Link ref={ref}>{linkText}</Link>);

    await screen.findByText(linkText);
    expect(ref.current?.nodeName).toBe('A');
  });

  it('can add the rel attribute to the rendered anchor tag', async () => {
    render(<Link isExternal={true}>{linkText}</Link>);

    const link = await screen.findByText(linkText);
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('can render the Link tag as other components', async () => {
    render(<Link as={Text}>{linkText}</Link>);

    const link = await screen.findByText(linkText);
    expect(link).toHaveClass(ComponentClassNames.Text);
    expect(link.nodeName).toBe('P');
  });

  it('can apply styling via props', async () => {
    render(
      <Link
        color="blue"
        fontSize="1.2em"
        fontWeight="bold"
        textDecoration="underline"
      >
        {linkText}
      </Link>
    );
    const link = await screen.findByText(linkText);
    expect(link).toHaveStyle({
      color: 'blue',
      fontSize: '1.2em',
      fontWeight: 'var(--amplify-font-weights-bold)',
      textDecoration: 'underline',
    });
  });

  it('can integrate with react-router-dom using the "to" prop', async () => {
    render(<SampleRoutingApp />);

    expect(screen.getByText(/you are home/i)).toBeInTheDocument();

    const leftClick = { button: 0 };
    userEvent.click(screen.getByText(/about/i), leftClick);

    expect(screen.getByText(/you are on the about page/i)).toBeInTheDocument();
  });

  it('should call console.warn if "to" prop is used', async () => {
    const spyWarn = jest.spyOn(console, 'warn');
    render(<Link to="/test">Test</Link>);
    expect(spyWarn).toHaveBeenCalled();
    spyWarn.mockRestore();
  });
});
