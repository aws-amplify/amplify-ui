import { render, screen } from '@testing-library/react';
import { kebabCase } from 'lodash';

import { Flex } from '../Flex';
import {
  ComponentPropsToStylePropsMap,
  FlexContainerStyleProps,
} from '../../types';
export const testFlexProps: FlexContainerStyleProps = {
  direction: 'column-reverse',
  gap: '10%',
  justifyContent: 'flex-end',
  alignItems: 'center',
  alignContent: 'space-between',
  wrap: 'wrap',
};
export const expectFlexContainerStyleProps = (element: HTMLElement): void => {
  expect(
    element.style.getPropertyValue(
      kebabCase(ComponentPropsToStylePropsMap.direction)
    )
  ).toBe(testFlexProps.direction);
  expect(
    element.style.getPropertyValue(ComponentPropsToStylePropsMap.gap)
  ).toBe(testFlexProps.gap);
  expect(
    element.style.getPropertyValue(
      kebabCase(ComponentPropsToStylePropsMap.justifyContent)
    )
  ).toBe(testFlexProps.justifyContent);
  expect(
    element.style.getPropertyValue(
      kebabCase(ComponentPropsToStylePropsMap.alignItems)
    )
  ).toBe(testFlexProps.alignItems);
  expect(
    element.style.getPropertyValue(
      kebabCase(ComponentPropsToStylePropsMap.alignContent)
    )
  ).toBe(testFlexProps.alignContent);
  expect(
    element.style.getPropertyValue(
      kebabCase(ComponentPropsToStylePropsMap.wrap)
    )
  ).toBe(testFlexProps.wrap);
};

describe('Flex: ', () => {
  const flexText = 'Flex primitive';

  it('can apply styling via props', async () => {
    render(<Flex {...testFlexProps}>{flexText}</Flex>);
    const flex = await screen.findByText(flexText);
    expectFlexContainerStyleProps(flex);
  });

  it('can apply a custom className', async () => {
    render(<Flex className="custom-flex">{flexText}</Flex>);
    const flex = await screen.findByText(flexText);
    expect(flex.classList.contains('custom-flex')).toBe(true);
  });

  it('can render any arbitrary data-* attribute', async () => {
    render(
      <Flex data-demo="true" testId="dataTest">
        {flexText}
      </Flex>
    );
    const view = await screen.findByTestId('dataTest');
    expect(view.dataset['demo']).toBe('true');
  });
});
