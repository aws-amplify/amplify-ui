import { Text } from '../Text';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { ComponentClassNames } from '../../shared';
import { ComponentPropsToStylePropsMap } from '../../types';
import { kebabCase } from 'lodash';

describe('Text: ', () => {
  const textText = 'This is a Text primitive';

  it('renders correct defaults', async () => {
    render(<Text>{textText}</Text>);

    const text = await screen.findByText(textText);
    expect(text.innerHTML).toBe(textText);
    expect(text.nodeName).toBe('P');
    expect(text.className).toContain(ComponentClassNames.Text);
  });

  it('can render a classname for Text', async () => {
    render(<Text className="my-text-component">{textText}</Text>);

    const text = await screen.findByText(textText);
    expect(text.className).toContain('my-text-component');
  });

  it('can render an id for Text', async () => {
    render(<Text id="myTextComponent">{textText}</Text>);

    const text = await screen.findByText(textText);
    expect(text.id).toContain('myTextComponent');
  });

  it('can set the data-truncate attribute', async () => {
    render(<Text isTruncated={true}>{textText}</Text>);

    const text = await screen.findByText(textText);
    expect(text.dataset['truncate']).toBe('true');
  });

  it('can set the data-variant attribute', async () => {
    render(<Text variant="primary">{textText}</Text>);

    const text = await screen.findByText(textText);
    expect(text.dataset['variant']).toBe('primary');
  });

  it('can apply font-family via props', async () => {
    render(<Text fontFamily="Arial">{textText}</Text>);
    const text = await screen.findByText(textText);
    expect(
      text.style.getPropertyValue(
        kebabCase(ComponentPropsToStylePropsMap.fontFamily)
      )
    ).toBe('Arial');
  });

  it('can apply font-style via props', async () => {
    render(<Text fontStyle="italic">{textText}</Text>);
    const text = await screen.findByText(textText);
    expect(
      text.style.getPropertyValue(
        kebabCase(ComponentPropsToStylePropsMap.fontStyle)
      )
    ).toBe('italic');
  });

  it('can apply font-weight via props', async () => {
    render(<Text fontWeight="bold">{textText}</Text>);
    const text = await screen.findByText(textText);
    expect(
      text.style.getPropertyValue(
        kebabCase(ComponentPropsToStylePropsMap.fontWeight)
      )
    ).toBe('bold');
  });

  it('can apply font-size via props', async () => {
    const fontSize = '1.2rem';

    render(<Text fontSize={fontSize}>{textText}</Text>);
    const text = await screen.findByText(textText);
    expect(
      text.style.getPropertyValue(
        kebabCase(ComponentPropsToStylePropsMap.fontSize)
      )
    ).toBe(fontSize);
  });

  it('can apply letter-spacing via props', async () => {
    render(<Text letterSpacing="1rem">{textText}</Text>);
    const text = await screen.findByText(textText);
    expect(
      text.style.getPropertyValue(
        kebabCase(ComponentPropsToStylePropsMap.letterSpacing)
      )
    ).toBe('1rem');
  });

  it('can apply line-height via props', async () => {
    render(<Text lineHeight="1rem">{textText}</Text>);
    const text = await screen.findByText(textText);
    expect(
      text.style.getPropertyValue(
        kebabCase(ComponentPropsToStylePropsMap.lineHeight)
      )
    ).toBe('1rem');
  });

  it('can apply text-decoration via props', async () => {
    render(<Text textDecoration="underline">{textText}</Text>);
    const text = await screen.findByText(textText);
    expect(
      text.style.getPropertyValue(
        kebabCase(ComponentPropsToStylePropsMap.textDecoration)
      )
    ).toBe('underline');
  });
});
