import { render } from '@testing-library/react';
import * as RouterModule from 'next/router';

import { InlineFilter, InlineFilterProps } from '..';

const useRouterSpy = jest.spyOn(RouterModule, 'useRouter');

const VALID_FILTERS: InlineFilterProps['filters'] = [
  'all',
  'android',
  'angular',
  'flutter',
  'react',
  'react-native',
  'swift',
  'vue',
];

describe('InlineFilter', () => {
  it.each(VALID_FILTERS)(
    'should render `children` if a value of [%s] is provided to `filters`',
    (platform) => {
      useRouterSpy.mockReturnValueOnce({
        query: { platform },
      } as unknown as RouterModule.NextRouter);
      const { container } = render(
        <InlineFilter filters={[platform]}>
          <span id="content">Content</span>
        </InlineFilter>
      );

      const children = container.querySelector('#content');
      expect(children).not.toBeNull();
    }
  );

  // test against nullish, empty values, and typos
  it.each([undefined, null, true, {}, 'string', 1, [], 'React', '@react'])(
    'should not render `children` if a value of %s is provided to `filters`',
    (filter) => {
      useRouterSpy.mockReturnValueOnce({
        query: { platform: 'react' },
      } as unknown as RouterModule.NextRouter);

      const { container } = render(
        // @ts-expect-error
        <InlineFilter filters={filter}>
          <span id="content">Content</span>
        </InlineFilter>
      );
      const children = container.querySelector('content');
      expect(children).toBeNull();
    }
  );

  it('should display `children` when `filters` has multple values', () => {
    useRouterSpy.mockReturnValue({
      query: { platform: 'react' },
    } as unknown as RouterModule.NextRouter);

    const { container } = render(
      <>
        <InlineFilter filters={['angular', 'react', 'vue']}>
          <span id="content1">Content One</span>
        </InlineFilter>
        <InlineFilter filters={['angular', 'vue']}>
          <span id="content2">Content Two</span>
        </InlineFilter>
      </>
    );
    const content1 = container.querySelector('#content1');
    const content2 = container.querySelector('#content2');
    expect(content1).not.toBeNull();
    expect(content2).toBeNull();
  });
});
