import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Breadcrumbs } from '../Breadcrumbs';
import { ComponentClassName } from '@aws-amplify/ui';

const breadcrumbs = [
  {
    href: 'test',
    label: 'test',
  },
  {
    label: 'test',
  },
];

const breadcrumbsWithDisabled = [
  {
    isDisabled: true,
    label: 'test',
    testId: 'disabled',
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
      container.querySelector(`.${ComponentClassName.Breadcrumbs}`)
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

  it('should add the disabled class with the disabled attribute to items', async () => {
    render(<Breadcrumbs items={breadcrumbsWithDisabled} />);

    const disabled = await screen.findByTestId('disabled');

    expect(disabled.classList).toContain('amplify-breadcrumbs__item--disabled');
  });

  it('should add the disabled class with the disabled attribute to link', async () => {
    render(
      <Breadcrumbs.Container>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link testId="disabled" href="/test" isDisabled={true}>
            Test
          </Breadcrumbs.Link>
        </Breadcrumbs.Item>
      </Breadcrumbs.Container>
    );

    const disabled = await screen.findByTestId('disabled');

    expect(disabled.classList).toContain('amplify-breadcrumbs__link--disabled');
  });

  it('should apply proper aria attributes to current link', () => {
    const { container } = render(<Breadcrumbs items={[{ label: 'Test' }]} />);
    const linkElement = container.querySelector(
      `.${ComponentClassName.BreadcrumbsLink}`
    );
    expect(linkElement).toHaveAttribute('aria-current', 'page');
  });
});
