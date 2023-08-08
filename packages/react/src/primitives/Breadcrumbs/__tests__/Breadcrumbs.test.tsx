import * as React from 'react';
import { render } from '@testing-library/react';
import { Breadcrumbs } from '../Breadcrumbs';
import { ComponentClassNames } from '../../shared';

const breadcrumbs = [
  {
    href: 'test',
    label: 'test',
  },
  {
    label: 'test',
  },
];

describe('Breadcrumbs:', () => {
  it('should match snapshot', () => {
    const { container } = render(<Breadcrumbs items={breadcrumbs} />);
    expect(container).toMatchSnapshot();
  });

  it('renders the proper accessibility attributes', () => {
    const { container } = render(<Breadcrumbs items={breadcrumbs} />);
    // https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/examples/breadcrumb/
    expect(
      container.querySelector(`.${ComponentClassNames.Breadcrumbs}`)
    ).toHaveAttribute('aria-label', 'Breadcrumb');
  });

  it('can render custom separators', () => {
    const { container } = render(
      <Breadcrumbs
        items={breadcrumbs}
        separator={<span className="test">|</span>}
      />
    );

    expect(container.querySelector('.test')).toBeInTheDocument();
  });

  it('can apply custom classNames', () => {
    const { container } = render(
      <Breadcrumbs.Container className="custom-breadcrumbs">
        <Breadcrumbs.Item className="custom-breadcrumbs__item">
          <Breadcrumbs.Link className="custom-breadcrumbs__link" href="/test">
            Test
          </Breadcrumbs.Link>
        </Breadcrumbs.Item>
      </Breadcrumbs.Container>
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
    const { container } = render(<Breadcrumbs items={[{ label: 'Test' }]} />);
    const linkElement = container.querySelector(
      `.${ComponentClassNames.BreadcrumbsLink}`
    );
    expect(linkElement).toHaveAttribute('aria-current', 'page');
  });
});
