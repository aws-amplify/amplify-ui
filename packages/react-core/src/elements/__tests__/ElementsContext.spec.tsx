import React from 'react';
import { renderHook } from '@testing-library/react';

import { ElementsProvider, ElementsContext } from '../ElementsContext';

const ButtonElement = () => <button />;
const ViewElement = () => <button />;

const elements = { Button: ButtonElement, View: ViewElement };

describe('ElementsContext', () => {
  it('provides the value of `ElementsContext` to consumers', () => {
    const wrapper = ({ children }: { children?: React.ReactNode }) => (
      <ElementsProvider elements={elements}>{children}</ElementsProvider>
    );

    const {
      result: { current: Button },
    } = renderHook(() => React.useContext(ElementsContext)?.['Button'], {
      wrapper,
    });
    expect(Button).toBe(ButtonElement);

    const {
      result: { current: View },
    } = renderHook(() => React.useContext(ElementsContext)?.['View'], {
      wrapper,
    });

    expect(View).toBe(ViewElement);
  });
});
