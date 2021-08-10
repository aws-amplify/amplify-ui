import { render, screen } from '@testing-library/react';
import { kebabCase } from 'lodash';

import { Collection } from '../Collection';
import { ComponentPropsToStylePropsMap } from '../../types';
import { ComponentClassNames } from '../../shared';

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

  it('should render Flex when rendering list collection', async () => {
    render(
      <Collection testId={testList} type="list" items={emojis}>
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
