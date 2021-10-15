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

describe('Collection component', () => {
  const testList = 'testList';

  it('should render a Search box when isSearchable is true', async () => {
    render(
      <Collection testId={testList} type="list" items={emojis} isSearchable>
        {(item, index) => (
          <div key={index} aria-label={item.title}>
            {item.emoji}
          </div>
        )}
      </Collection>
    );

    const searchField = await screen.findByRole('searchbox');
    expect(searchField).not.toBe(undefined);
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

    const navigation = await screen.findByRole('navigation');

    expect(navigation.classList).toContain(ComponentClassNames.Pagination);
    expect(navigation).not.toBe(undefined);
  });

  it('should render Flex when rendering list collection', async () => {
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
    const collection = (await screen.findByTestId(testList)) as HTMLDivElement;
    expect(
      collection.style.getPropertyValue(
        kebabCase(ComponentPropsToStylePropsMap.direction)
      )
    ).toBe('column');
    expect(collection.children[0].getAttribute('aria-label')).toBe('LOL');
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

  it('can render any arbitrary data-* attribute', async () => {
    render(
      <Collection
        className="custom-collection"
        data-demo={true}
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
    const view = await screen.findByTestId(testList);
    expect(view.dataset['demo']).toBe('true');
  });
});
