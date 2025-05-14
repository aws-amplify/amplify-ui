import React from 'react';
import { render } from '@testing-library/react';
import { ElementsProvider } from '../ElementsContext';
import {
  defineBaseElement,
  defineBaseElementWithRef,
} from '../defineBaseElement';

const displayName = 'Input';
const type = 'input';

describe('defineBaseElement', () => {
  it.each([
    { name: 'defineBaseElement', define: defineBaseElement },
    { name: 'defineBaseElementWithRef', define: defineBaseElementWithRef },
  ])(
    '`$name` renders a `BaseElement` of the provided element `type` and `displayName`',
    ({ define }) => {
      // @ts-expect-error return types slightly differ
      // between each other but are safe for comparison in this test
      const InputElement: React.ComponentType<{ className?: string }> = define({
        type,
        displayName,
      });

      expect(InputElement).toBeDefined();
      expect(InputElement.displayName).toBe(displayName);

      const className = 'input-classname';

      const { container } = render(<InputElement className={className} />);

      const element = container.querySelector('input');

      expect(element).toBeDefined();

      expect(element?.className).toBe(className);
    }
  );

  it.each([
    { name: 'defineBaseElement', define: defineBaseElement },
    { name: 'defineBaseElementWithRef', define: defineBaseElementWithRef },
  ])(
    'rendered `BaseElement` from `$name` returns the value of `displayName` in `ElementsContext` if any',
    ({ define }) => {
      // @ts-expect-error return types slightly differ
      // between each other but are safe for comparison in this test
      const InputElement: React.ComponentType = define({ type, displayName });
      const OverrideElement = () => <input type="checkbox" />;

      const { container } = render(
        <ElementsProvider elements={{ Input: OverrideElement }}>
          <InputElement />
        </ElementsProvider>
      );

      const element = container.querySelector('input');

      expect(element).toBeDefined();

      expect(element?.type).toBe('checkbox');
    }
  );

  describe('defineBaseElementWithRef', () => {
    it('returns a `BaseElement` that accepts a `ref`', () => {
      const InputElement = defineBaseElementWithRef<'input', 'type'>({
        type,
        displayName,
      });
      const inputRef = React.createRef<HTMLInputElement>();

      const { container } = render(
        <InputElement ref={inputRef} type="checkbox" />
      );

      const element = container.querySelector('input');

      expect(element).toBeDefined();

      expect(element?.type).toBe('checkbox');
    });
  });
});
