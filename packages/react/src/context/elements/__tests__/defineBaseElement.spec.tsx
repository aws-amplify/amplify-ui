import React from 'react';
import { render } from '@testing-library/react';
import { ElementsProvider } from '../ElementsContext';
import defineBaseElement from '../defineBaseElement';

const displayName = 'Input';
const type = 'input';

describe('defineBaseElement', () => {
  it('renders a `BaseElement` of the provided element `type` and `displayName`', () => {
    const InputElement = defineBaseElement({ type, displayName });

    expect(InputElement).toBeDefined();
    expect(InputElement.displayName).toBe(displayName);

    const className = 'input-classname';

    const { container } = render(<InputElement className={className} />);

    const element = container.querySelector('input');

    expect(element).toBeDefined();

    expect(element?.className).toBe(className);
  });

  it('rendered `BaseElement` returns the value of `displayName` in `ElementsContext` if any', () => {
    const InputElement = defineBaseElement({ type, displayName });
    const OverrideElement = () => <input type="checkbox" />;

    const { container } = render(
      <ElementsProvider elements={{ Input: OverrideElement }}>
        <InputElement />
      </ElementsProvider>
    );

    const element = container.querySelector('input');

    expect(element).toBeDefined();

    expect(element?.type).toBe('checkbox');
  });
});
