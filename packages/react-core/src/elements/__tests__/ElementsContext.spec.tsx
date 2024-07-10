import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { ElementsProvider, useElement } from '../ElementsContext';

const ButtonElement = () => <button />;
const ViewElement = () => <button />;

const elements = { Button: ButtonElement, View: ViewElement };

describe('ElementsContext', () => {
  it('`useElement` reads `BaseElement` values passed to `ElementsProvider`', () => {
    const wrapper = ({ children }: { children?: React.ReactNode }) => (
      <ElementsProvider elements={elements}>{children}</ElementsProvider>
    );

    const {
      result: { current: Button },
    } = renderHook(() => useElement('Button'), { wrapper });
    expect(Button).toBe(ButtonElement);

    const {
      result: { current: View },
    } = renderHook(() => useElement('View'), { wrapper });

    expect(View).toBe(ViewElement);
  });

  it('`useElement` returns `undefined` when lookup fails', () => {
    const wrapper = ({ children }: { children?: React.ReactNode }) => (
      <ElementsProvider elements={elements}>{children}</ElementsProvider>
    );

    const invalidElementName = 'Not a Button';

    const {
      result: { current: Element },
      // @ts-expect-error
    } = renderHook(() => useElement(invalidElementName), { wrapper });
    expect(Element).toBeUndefined();
  });
});
