import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { Divider } from '../Divider';
import { ComponentClassNames } from '../../shared';

describe('Divider component', () => {
  it('should add the size classes', async () => {
    render(
      <div>
        <Divider size="small" testId="small" />
        <Divider size="large" testId="large" />
      </div>
    );

    const small = await screen.findByTestId('small');
    const large = await screen.findByTestId(`large`);

    expect(small.classList).toContain(
      `${ComponentClassNames['Divider']}--small`
    );
    expect(large.classList).toContain(
      `${ComponentClassNames['Divider']}--large`
    );
  });

  it('should add the orientation classes', async () => {
    render(
      <div>
        <Divider orientation="horizontal" testId="horizontal" />
        <Divider orientation="vertical" testId="vertical" />
      </div>
    );

    const horizontal = await screen.findByTestId('horizontal');
    const vertical = await screen.findByTestId(`vertical`);

    expect(horizontal.classList).toContain(
      `${ComponentClassNames['Divider']}--horizontal`
    );
    expect(vertical.classList).toContain(
      `${ComponentClassNames['Divider']}--vertical`
    );
  });

  it('renders <hr> with expected data attributes and classname', async () => {
    const dividerTestId = 'dividerTest';
    render(<Divider id={dividerTestId} />);

    const divider = (await screen.findByRole('separator'));
    expect(divider.nodeName).toBe('HR');
    expect(divider.id).toBe(dividerTestId);
    expect(divider.dataset['size']).toBeUndefined();
    expect(divider.getAttribute('aria-orientation')).toBe('horizontal');
    expect(divider.className).toContain(ComponentClassNames.Divider);
  });

  it('renders a vertical divider', async () => {
    render(<Divider orientation="vertical" />);
    const divider = (await screen.findByRole('separator'));
    expect(divider.getAttribute('aria-orientation')).toBe('vertical');
  });

  it('can render custom classnames', async () => {
    render(<Divider className="my-divider" />);

    const divider = (await screen.findByRole('separator'));
    expect(divider.className).toContain('my-divider');
    expect(divider.className).toContain(ComponentClassNames.Divider);
  });

  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLHRElement>();
    render(<Divider className="my-divider" ref={ref} />);

    await screen.findByRole('separator');
    expect(ref.current.nodeName).toBe('HR');
  });

  it('can render any arbitrary data-* attribute', async () => {
    render(<Divider data-demo="true" />);
    const divider = (await screen.findByRole('separator'));
    expect(divider.dataset['demo']).toBe('true');
  });

  it('adds label to the dataset (to then be displayed via CSS)', async () => {
    render(<Divider label="Hello" />);
    const divider = (await screen.findByRole('separator'));
    expect(divider.dataset['label']).toBe('Hello');
  });
});
