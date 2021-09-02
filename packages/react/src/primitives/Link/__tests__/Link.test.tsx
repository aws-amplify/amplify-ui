import { render, screen } from '@testing-library/react';
import { kebabCase } from 'lodash';
import { ComponentClassNames } from '../../shared';
import { ComponentPropsToStylePropsMap } from '../../types';
import { Link } from '../Link';
import { Text } from '../../Text/Text';

describe('Text: ', () => {
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
    expect(
      link.style.getPropertyValue(ComponentPropsToStylePropsMap.color)
    ).toBe('blue');
    expect(
      link.style.getPropertyValue(
        kebabCase(ComponentPropsToStylePropsMap.fontSize)
      )
    ).toBe('1.2em');
    expect(
      link.style.getPropertyValue(
        kebabCase(ComponentPropsToStylePropsMap.fontWeight)
      )
    ).toBe('bold');
    expect(
      link.style.getPropertyValue(
        kebabCase(ComponentPropsToStylePropsMap.textDecoration)
      )
    ).toBe('underline');
  });
});
