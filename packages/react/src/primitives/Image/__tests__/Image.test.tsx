import * as React from 'react';
import kebabCase from 'lodash/kebabCase';
import { fireEvent, render, screen } from '@testing-library/react';

import { Image } from '../Image';
import { ComponentClassNames } from '../../shared';
import { ComponentPropsToStylePropsMap } from '../../types';

const altText = 'Cool cat';
const src = 'http://localhost/cat.jpg';

describe('Image: ', () => {
  it('renders <img> with alt and expected classname', async () => {
    render(<Image id="cool_cat" src={src} alt={altText} />);

    const image = (await screen.findByAltText(altText)) as HTMLImageElement;
    expect(image.nodeName).toBe('IMG');
    expect(image.src).toBe(src);
    expect(image.className).toContain(ComponentClassNames.Image);
  });

  it('can set sizes and srcset attributes', async () => {
    const srcSet = 'cat-480w.jpg 480w, cat-800w.jpg 800w';
    const sizes = '(max-width: 600px) 480px, 800px';
    const src = 'cat-800w.jpg';

    render(
      <Image
        testId="dataTest"
        alt={altText}
        src={src}
        srcSet={srcSet}
        sizes={sizes}
      />
    );
    const image = (await screen.findByTestId('dataTest')) as HTMLImageElement;

    expect(image).toBeDefined();
    expect(image.sizes).toBe(sizes);
    expect(image.srcset).toBe(srcSet);
  });

  it('can set onLoad event handler', () => {
    const onLoad = jest.fn();
    render(
      <Image
        id="dataTest"
        alt={altText}
        src="nonexistent.jpg"
        onLoad={onLoad}
      />
    );

    fireEvent.load(screen.getByAltText(altText));
    expect(onLoad).toHaveBeenCalledTimes(1);
  });

  it('can set onError event handler', () => {
    const onError = jest.fn();
    render(
      <Image
        id="dataTest"
        alt={altText}
        src="nonexistent.jpg"
        onError={onError}
      />
    );

    fireEvent.error(
      screen.getByAltText(altText),
      new Error('🚫 there was an error 🚫')
    );
    expect(onError).toHaveBeenCalledTimes(1);
  });

  it('can render any arbitrary data-* attribute', async () => {
    render(<Image data-cat="true" testId="dataTest" alt={altText} src={src} />);
    const image = await screen.findByTestId('dataTest');
    expect(image.dataset['cat']).toBe('true');
  });

  it('can apply styling via props', async () => {
    render(
      <Image
        alt={altText}
        src={src}
        width="100%"
        height="auto"
        opacity="0.5"
        objectFit="cover"
        objectPosition="top left"
        testId="stylingTest"
      />
    );

    const image = await screen.findByTestId('stylingTest');

    expect(
      image.style.getPropertyValue(ComponentPropsToStylePropsMap.width)
    ).toBe('100%');
    expect(
      image.style.getPropertyValue(ComponentPropsToStylePropsMap.height)
    ).toBe('auto');
    expect(
      image.style.getPropertyValue(ComponentPropsToStylePropsMap.opacity)
    ).toBe('0.5');
    expect(
      image.style.getPropertyValue(
        kebabCase(ComponentPropsToStylePropsMap.objectFit)
      )
    ).toBe('cover');
    expect(
      image.style.getPropertyValue(
        kebabCase(ComponentPropsToStylePropsMap.objectPosition)
      )
    ).toBe('top left');
  });

  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLImageElement>();

    render(<Image alt={altText} src="nonexistent.jpg" ref={ref} />);
    await screen.findByRole('img');
    expect(ref.current?.nodeName).toBe('IMG');
  });
});
