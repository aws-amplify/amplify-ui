import React from 'react';
import { render } from '@testing-library/react';
import { FilterChildren, FilterChildrenProps } from '..';

const VALID_FILTERS: FilterChildrenProps['allowedFilters'] = [
  'all',
  'android',
  'angular',
  'flutter',
  'react',
  'react-native',
  'swift',
  'vue',
];

describe('FilterChildren', () => {
  it.each(VALID_FILTERS)(
    'should render `children` if a value of [%s] is provided to `allowedFilters` and `targetFilter`',
    (filter) => {
      const { container } = render(
        <FilterChildren allowedFilters={[filter]} targetFilter={filter}>
          <span id="content">Content</span>
        </FilterChildren>
      );

      const children = container.querySelector('#content');
      expect(children).not.toBeNull();
    }
  );

  // test against nullish, empty values, and typos
  it.each([undefined, null, true, {}, 'string', 1, [], 'React', '@react'])(
    'should not render `children` if a value of %s is provided to `targetFilter` and `targetFilter`',
    (filter) => {
      const { container } = render(
        // @ts-expect-error
        <FilterChildren allowedFilters={filter} targetFilter={filter}>
          <span id="content">Content</span>
        </FilterChildren>
      );
      const children = container.querySelector('content');
      expect(children).toBeNull();
    }
  );

  it('should display `children` when `allowedFilters` has multiple values', () => {
    const { container } = render(
      <>
        <FilterChildren
          allowedFilters={['angular', 'react', 'vue']}
          targetFilter="react"
        >
          <span id="content1">Content One</span>
        </FilterChildren>
        <FilterChildren allowedFilters={['angular', 'vue']}>
          <span id="content2">Content Two</span>
        </FilterChildren>
      </>
    );
    const content1 = container.querySelector('#content1');
    const content2 = container.querySelector('#content2');
    expect(content1).not.toBeNull();
    expect(content2).toBeNull();
  });
});
