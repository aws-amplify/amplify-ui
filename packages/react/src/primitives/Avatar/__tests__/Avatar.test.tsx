import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Avatar } from '../Avatar';
import { ComponentClassName } from '@aws-amplify/ui';

describe('Avatar:', () => {
  it('can render variations', async () => {
    render(
      <>
        <Avatar variation="outlined" testId="outlined" />
        <Avatar variation="filled" testId="filled" />
        <Avatar testId="default" />
      </>
    );

    const outlined = await screen.findByTestId('outlined');
    const filled = await screen.findByTestId('filled');
    const base = await screen.findByTestId('default');

    expect(outlined.classList).toContain(
      `${ComponentClassName['Avatar']}--outlined`
    );
    expect(filled.classList).toContain(
      `${ComponentClassName['Avatar']}--filled`
    );
    expect(base.classList).toContain(`${ComponentClassName['Avatar']}`);
  });

  it('can render sizes', async () => {
    render(
      <>
        <Avatar size="small" testId="small" />
        <Avatar size="large" testId="large" />
      </>
    );

    const small = await screen.findByTestId('small');
    const large = await screen.findByTestId('large');

    expect(small.classList).toContain(`${ComponentClassName['Avatar']}--small`);
    expect(large.classList).toContain(`${ComponentClassName['Avatar']}--large`);
  });

  it('can apply a custom className', async () => {
    render(<Avatar className="custom-avatar" testId="test-id" />);
    const avatar = await screen.findByTestId('test-id');
    expect(avatar.classList.contains('custom-avatar')).toBe(true);
    expect(avatar.classList.contains(ComponentClassName.Avatar)).toBe(true);
  });

  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLSpanElement>();

    render(<Avatar ref={ref} testId="test-id" />);

    await screen.findByTestId('test-id');
    expect(ref.current?.nodeName).toBe('SPAN');
    expect(ref.current?.classList.contains(ComponentClassName.Avatar)).toBe(
      true
    );
  });

  it('should render an image if it has src', () => {
    render(<Avatar src="test.jpg" testId="test-id" />);
    const image = screen.getByRole('img');
    expect(image.nodeName).toBe('IMG');
    expect(image.getAttribute('src')).toBe('test.jpg');
  });
});
