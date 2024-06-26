import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import createElementsContext from '../createElementsContext';
import { ButtonElementBase, ViewElementBase } from '../defaultElements';

const elements = { Button: ButtonElementBase, View: ViewElementBase };

describe('createElementsContext', () => {
  it('useElement exposes the expected elements', () => {
    const { useElement } = createElementsContext(elements);

    const {
      result: { current: Button },
    } = renderHook(() => useElement('Button'));
    const {
      result: { current: View },
    } = renderHook(() => useElement('View'));

    expect(Button).toBe(ButtonElementBase);
   expect(View).toBe(ViewElementBase);
  });

  it('Passing `elements` ElementsProvider overrides the default `Elements`', () => {
    const { ElementsProvider, useElement } = createElementsContext(elements);

    const OtherButton = () => <>Hi</>;
    const OtherView = () => <>Hi</>;
    const wrapper = (props: { children?: React.ReactNode }) => (
      <ElementsProvider
        elements={{ Button: OtherButton, View: OtherView }}
        {...props}
      />
    );

    const {
      result: { current: Button },
    } = renderHook(() => useElement('Button'), { wrapper });
    const {
      result: { current: View },
    } = renderHook(() => useElement('View'), { wrapper });

    expect(Button).not.toBe(ButtonElementBase);
    expect(Button).toBe(OtherButton);

    expect(View).not.toBe(ViewElementBase);
    expect(View).toBe(OtherView);
  });
});
