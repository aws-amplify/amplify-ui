import * as React from 'react';
import { render, screen, within } from '@testing-library/react';

import { Icon } from '../Icon';
import { ComponentClassNames } from '../../shared';

describe('Icon component', () => {
  const iconTestId = 'iconSearch';
  const pathData = `M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91
  3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49
  19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z`;

  it('should render <svg> with default attributes', async () => {
    render(
      <Icon
        id={iconTestId}
        testId={iconTestId}
        pathData={pathData}
        ariaLabel="Search"
      />
    );

    const icon = await screen.findByTestId(iconTestId);
    expect(icon.id).toBe(iconTestId);
    expect(icon.nodeName).toBe('svg');
    expect(icon.dataset['size']).toBeUndefined();
    expect(icon.getAttribute('viewBox')).toBe('0 0 24 24');
    expect(icon.classList[0]).toContain(ComponentClassNames.Icon);
  });

  it('should render <path> with provided path data', async () => {
    render(<Icon testId={iconTestId} pathData={pathData} ariaLabel="Search" />);

    const icon = await screen.findByTestId(iconTestId);
    expect(icon.childNodes.length).toBe(1);
    const path = icon.childNodes[0] as SVGElement;
    expect(path.getAttribute('d')).toBe(pathData);
    expect(path.getAttribute('fill')).toBe('currentColor');
  });

  it('should render a classname for Icon', async () => {
    render(
      <Icon
        testId={iconTestId}
        pathData={pathData}
        className="my-icon-component"
        ariaLabel="Search"
      />
    );

    const icon = await screen.findByTestId(iconTestId);
    expect(icon.classList.length).toBe(2);
    expect(icon.classList[0]).toContain(ComponentClassNames.Icon);
    expect(icon.classList[1]).toContain('my-icon-component');
  });

  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<SVGSVGElement>();

    render(
      <Icon
        ref={ref}
        testId={iconTestId}
        pathData={pathData}
        ariaLabel="Search"
      />
    );

    await screen.findByTestId(iconTestId);
    expect(ref.current.nodeName).toBe('svg');
  });

  it('can set viewBox attribute', async () => {
    render(
      <Icon
        testId={iconTestId}
        pathData={pathData}
        viewBox={{ minX: 0, minY: 0, width: 100, height: 100 }}
        ariaLabel="Search"
      />
    );

    const icon = await screen.findByTestId(iconTestId);
    expect(icon.getAttribute('viewBox')).toBe('0 0 100 100');
  });

  it('can accept SVG children', async () => {
    render(
      <Icon testId={iconTestId} ariaLabel="Search">
        <path
          role="path"
          opacity="0.5"
          d="M21 10C21 13.3137 18.3137 16 15 16C11.6863 16 9 13.3137 9 10C9 6.68629 11.6863 4 15 4C18.3137 4 21 6.68629 21 10Z"
          fill="currentColor"
        />
        <path role="path" d="M3 4H7V20H3V4Z" fill="currentColor" />
      </Icon>
    );

    const icon = await screen.findByTestId(iconTestId);
    const paths = await within(icon).findAllByRole('path');
    expect(paths.length).toBe(2);
    expect(paths[0].getAttribute('opacity')).toBe('0.5');
  });
});
