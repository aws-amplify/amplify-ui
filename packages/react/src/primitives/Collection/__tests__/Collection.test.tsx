import { render, screen } from '@testing-library/react';
import { kebabCase } from 'lodash';

import { Collection } from '../Collection';
import { ComponentPropsToStylePropsMap } from '../../types';
import { ComponentClassNames } from '../../shared/constants';

const emojis = [
  {
    title: 'LOL',
    emoji: '🤣',
  },
  {
    title: 'Thumbs up',
    emoji: '👍',
  },
  {
    title: 'Face palm',
    emoji: '🤦‍♂️',
  },
];

const getElementByClassName = <T extends HTMLElement = HTMLElement>(
  element: HTMLElement,
  className: string
) => element.querySelector<T>(`.${className}`);

describe('Collection component', () => {
  const testList = 'testList';

  it('should render a Search box when isSearchable is true', async () => {
    render(
      <Collection
        testId={testList}
        type="list"
        items={emojis}
        isSearchable
        isPaginated
      >
        {(item, index) => (
          <div key={index} aria-label={item.title}>
            {item.emoji}
          </div>
        )}
      </Collection>
    );

    const collection = await screen.findByTestId('testList');
    const search = getElementByClassName(
      collection,
      ComponentClassNames.CollectionSearch
    );

    expect(search).not.toBe(null);
  });

  it('should render pagination when isPaginated is true', async () => {
    render(
      <Collection
        testId={testList}
        type="list"
        items={emojis}
        isPaginated
        itemsPerPage={1}
      >
        {(item, index) => (
          <div key={index} aria-label={item.title}>
            {item.emoji}
          </div>
        )}
      </Collection>
    );

    const collection = await screen.findByTestId(testList);
    const pagination = getElementByClassName(
      collection,
      ComponentClassNames.CollectionPagination
    );

    expect(pagination).not.toBe(null);
  });

  it('should render Flex when rendering list collection items', async () => {
    render(
      <Collection
        testId={testList}
        type="list"
        direction="column"
        items={emojis}
      >
        {(item, index) => (
          <div key={index} aria-label={item.title}>
            {item.emoji}
          </div>
        )}
      </Collection>
    );

    const collection = await screen.findByTestId(testList);
    const items = getElementByClassName<HTMLDivElement>(
      collection,
      ComponentClassNames.CollectionItems
    );

    expect(
      items.style.getPropertyValue(
        kebabCase(ComponentPropsToStylePropsMap.direction)
      )
    ).toBe('column');

    expect(items.children[0].getAttribute('aria-label')).toBe('LOL');
  });

  it('should not throw when items is not an array', () => {
    expect(() =>
      render(
        <Collection type="list" testId={testList} items={null}>
          {(item, index) => <div />}
        </Collection>
      )
    ).not.toThrowError(TypeError);
  });

  it('can apply a custom className', async () => {
    render(
      <Collection
        className="custom-collection"
        testId={testList}
        type="list"
        items={emojis}
      >
        {(item, index) => (
          <div key={index} aria-label={item.title}>
            {item.emoji}
          </div>
        )}
      </Collection>
    );
    const collection = await screen.findByTestId(testList);
    expect(collection.classList.contains('custom-collection')).toBe(true);
  });

  it('can render arbitrary attributes to items container', async () => {
    render(
      <Collection data-demo={true} testId={testList} type="list" items={emojis}>
        {(item, index) => (
          <div key={index} aria-label={item.title}>
            {item.emoji}
          </div>
        )}
      </Collection>
    );

    const collection = await screen.findByTestId(testList);
    const items = getElementByClassName<HTMLDivElement>(
      collection,
      ComponentClassNames.CollectionItems
    );

    expect(items.dataset['demo']).toBe('true');
  });
});
