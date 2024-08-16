import React from 'react';
import { render } from '@testing-library/react';
import { defineBaseElementWithRef } from '../defineBaseElement';
import withBaseElementProps from '../withBaseElementProps';

const displayName = 'Input';
const type = 'input';

describe('withBaseElementProps', () => {
  it('applies a `defaultProps` object to a `Target` element', () => {
    const InputElement = defineBaseElementWithRef<'input', 'type'>({
      type,
      displayName,
    });

    const { container } = render(<InputElement />);

    const element = container.querySelector('input');

    expect(element).toBeDefined();

    expect(element?.type).toBe('text');

    const defaultProps = { type: 'checkbox' };

    const WrappedInputElement = withBaseElementProps(
      InputElement,
      defaultProps
    );

    const { container: wrappedContainer } = render(<WrappedInputElement />);

    const wrappedElement = wrappedContainer.querySelector('input');

    expect(wrappedElement).toBeDefined();

    expect(wrappedElement?.type).toBe('checkbox');
  });

  it('resolves and applies a `defaultProps` callback to a `Target` element', () => {
    const InputElement = defineBaseElementWithRef<'input', 'type'>({
      type,
      displayName,
    });

    const { container } = render(<InputElement />);

    const element = container.querySelector('input');

    expect(element).toBeDefined();

    expect(element?.type).toBe('text');

    const defaultProps = { type: 'checkbox' };

    const WrappedInputElement = withBaseElementProps(
      InputElement,
      () => defaultProps
    );

    const { container: wrappedContainer } = render(<WrappedInputElement />);

    const wrappedElement = wrappedContainer.querySelector('input');

    expect(wrappedElement).toBeDefined();

    expect(wrappedElement?.type).toBe('checkbox');
  });

  it('`defaultProps` are overriden by `props` passed to wrapped `BaseElement`', () => {
    const InputElement = defineBaseElementWithRef<'input', 'type'>({
      type,
      displayName,
    });

    const defaultProps = { type: 'checkbox' };

    const WrappedInputElement = withBaseElementProps(
      InputElement,
      () => defaultProps
    );

    const { container } = render(<WrappedInputElement />);

    const element = container.querySelector('input');

    expect(element).toBeDefined();

    expect(element?.type).toBe('checkbox');

    const { container: nextContainer } = render(
      <WrappedInputElement type="image" />
    );

    const nextElement = nextContainer.querySelector('input');

    expect(nextElement).toBeDefined();

    expect(nextElement?.type).toBe('image');
  });

  it('provides `props` passed to wrapped `BaseElement` to `defaultProps` callback functions', () => {
    const InputElement = defineBaseElementWithRef<'input', 'disabled' | 'type'>(
      {
        type,
        displayName,
      }
    );

    const defaultProps = { type: 'checkbox' };

    const WrappedInputElement = withBaseElementProps(
      InputElement,
      ({ disabled }) => ({
        ...defaultProps,
        className: disabled ? 'input input--disabled' : 'input',
      })
    );

    const { container } = render(<WrappedInputElement />);

    const element = container.querySelector('input');

    expect(element).toBeDefined();

    expect(element?.type).toBe('checkbox');
    expect(element?.className).toBe('input');

    const { container: nextContainer } = render(
      <WrappedInputElement disabled type="image" />
    );

    const nextElement = nextContainer.querySelector('input');

    expect(nextElement).toBeDefined();

    expect(nextElement?.type).toBe('image');
    expect(nextElement?.className).toBe('input input--disabled');
  });
});
