import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { ComponentClassName } from '@aws-amplify/ui';
import { Link } from '../Link';
import { Text } from '../../Text/Text';

describe('Link:', () => {
  const linkText = 'My Link';

  it('renders correct defaults', async () => {
    render(<Link>{linkText}</Link>);

    const link = await screen.findByText(linkText);
    expect(link).toContainHTML(linkText);
    expect(link.nodeName).toBe('A');
    expect(link).toHaveClass(ComponentClassName.Link);
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
    render(<Link isExternal>{linkText}</Link>);

    const link = await screen.findByText(linkText);
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('can render the Link tag as other components', async () => {
    render(<Link as={Text}>{linkText}</Link>);

    const link = await screen.findByText(linkText);
    expect(link).toHaveClass(ComponentClassName.Text);
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
});
