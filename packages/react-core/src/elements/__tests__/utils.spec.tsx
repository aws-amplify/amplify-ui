import React from 'react';
import { isComponent, isForwardRefExoticComponent } from '../utils';

class ClassComponent extends React.Component {
  render() {
    return <button />;
  }
}

const FunctionComponent = () => <button />;

const ForwardRefComponent = React.forwardRef<HTMLButtonElement>(
  function btnWithForwardRef(props, ref) {
    return <button {...props} ref={ref} />;
  }
);

const ComponentNode: React.ReactNode = 'BTN';

describe('isComponent', () => {
  it('returns `true` when called with a Class component', () => {
    expect(isComponent(ClassComponent)).toBe(true);
  });

  it('returns `true` when called with a Function component', () => {
    expect(isComponent(FunctionComponent)).toBe(true);
  });

  it('returns `false` when called with a ForwardRef component', () => {
    expect(isComponent(ForwardRefComponent)).toBe(false);
  });

  it('returns `false` when called with a ReactNode', () => {
    // @ts-expect-error - robustness testing
    expect(isComponent(ComponentNode)).toBe(false);
  });
});

describe('isForwardRefExoticComponent', () => {
  it('returns `true` when called with a ForwardRef component', () => {
    expect(isForwardRefExoticComponent(ForwardRefComponent)).toBe(true);
  });

  it('returns `false` when called with a Class component', () => {
    expect(isForwardRefExoticComponent(ClassComponent)).toBe(false);
  });

  it('returns `false` when called with a Function component', () => {
    expect(isForwardRefExoticComponent(FunctionComponent)).toBe(false);
  });

  it('returns `false` when called with a ReactNode', () => {
    // @ts-expect-error - robustness testing
    expect(isForwardRefExoticComponent(ComponentNode)).toBe(false);
  });
});
