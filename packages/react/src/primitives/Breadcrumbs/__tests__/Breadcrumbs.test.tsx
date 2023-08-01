import * as React from 'react';
import { render } from '@testing-library/react';
import { Breadcrumbs } from '../Breadcrumbs';
import { ComponentClassNames } from '../../shared';

const breadcrumbs = [
  {
    href: 'test',
    text: 'test',
  },
  {
    href: 'test',
    text: 'test',
    isCurrent: true,
  },
];

describe('Breadcrumbs:', () => {
  it('should match snapshot', () => {
    const { container } = render(
      <Breadcrumbs>
        {breadcrumbs.map(({ text, href, isCurrent }) => (
          <Breadcrumbs.Item isCurrent={isCurrent}>
            <Breadcrumbs.Link href={href}>{text}</Breadcrumbs.Link>
          </Breadcrumbs.Item>
        ))}
      </Breadcrumbs>
    );
    expect(container).toMatchSnapshot();
  });

  it('renders the proper accessibility attributes', () => {
    const { container } = render(
      <Breadcrumbs>
        {breadcrumbs.map(({ text, href, isCurrent }) => (
          <Breadcrumbs.Item isCurrent={isCurrent}>
            <Breadcrumbs.Link href={href}>{text}</Breadcrumbs.Link>
          </Breadcrumbs.Item>
        ))}
      </Breadcrumbs>
    );
    // https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/examples/breadcrumb/
    expect(
      container.querySelector(`.${ComponentClassNames.Breadcrumbs}`)
    ).toHaveAttribute('aria-label', 'Breadcrumb');
  });

  it('can render custom separators', () => {
    const { container } = render(
      <Breadcrumbs separator={<span className="test">|</span>}>
        {breadcrumbs.map(({ text, href, isCurrent }) => (
          <Breadcrumbs.Item isCurrent={isCurrent}>
            <Breadcrumbs.Link href={href}>{text}</Breadcrumbs.Link>
          </Breadcrumbs.Item>
        ))}
      </Breadcrumbs>
    );

    expect(container.querySelector('.test')).toBeInTheDocument();
  });

  it('can apply custom classNames', () => {
    const { container } = render(
      <Breadcrumbs className="custom-breadcrumbs">
        <Breadcrumbs.Item className="custom-breadcrumbs__item">
          <Breadcrumbs.Link className="custom-breadcrumbs__link" href="/test">
            Test
          </Breadcrumbs.Link>
        </Breadcrumbs.Item>
      </Breadcrumbs>
    );
    expect(container.querySelector('.custom-breadcrumbs')).toBeInTheDocument();
    expect(
      container.querySelector('.custom-breadcrumbs__item')
    ).toBeInTheDocument();
    expect(
      container.querySelector('.custom-breadcrumbs__link')
    ).toBeInTheDocument();
  });

  it('should apply proper aria attributes to current link', () => {
    const { container } = render(
      <Breadcrumbs>
        <Breadcrumbs.Item isCurrent>
          <Breadcrumbs.Link href="test">Test</Breadcrumbs.Link>
        </Breadcrumbs.Item>
      </Breadcrumbs>
    );
    const linkElement = container.querySelector(
      `.${ComponentClassNames.BreadcrumbsLink}`
    );
    expect(linkElement).toHaveAttribute('aria-current', 'page');
  });
});
