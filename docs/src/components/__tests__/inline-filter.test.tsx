import { render } from '@testing-library/react';
import { InlineFilter } from '../InlineFilter';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
// mock a return value on useRouter
useRouter.mockReturnValue({
  query: {
    platform: 'react',
  },
});

describe('InlineFilter', () => {
  it('should display children of matching filters', () => {
    const { container } = render(
      <div>
        <InlineFilter filters={['react']}>
          <span id="react-content">React Content</span>
        </InlineFilter>
        <InlineFilter filters={['angular']}>
          <span id="angular-content">Angular Content</span>
        </InlineFilter>
      </div>
    );
    const reactNode = container.querySelector('#react-content');
    const angularNode = container.querySelector('#angular-content');
    expect(reactNode).not.toBeNull();
    expect(angularNode).toBeNull();
  });

  it('should use exact matches for filters', () => {
    const { container } = render(
      <div>
        <InlineFilter filters={['react']}>
          <span id="react-content">React Content</span>
        </InlineFilter>
        <InlineFilter filters={['React']}>
          <span id="filter1">Content</span>
        </InlineFilter>
        <InlineFilter filters={['@react']}>
          <span id="filter2">Content</span>
        </InlineFilter>
        <InlineFilter filters={['1react']}>
          <span id="filter3">Content</span>
        </InlineFilter>
      </div>
    );
    const reactNode = container.querySelector('#react-content');
    const filter1 = container.querySelector('#filter1');
    const filter2 = container.querySelector('#filter2');
    const filter3 = container.querySelector('#filter3');
    expect(reactNode).not.toBeNull();
    expect(filter1).toBeNull();
    expect(filter2).toBeNull();
    expect(filter3).toBeNull();
  });

  it('should always render the all filter', () => {
    const { container } = render(
      <div>
        <InlineFilter filters={['react']}>
          <span id="react-content">React Content</span>
        </InlineFilter>
        <InlineFilter filters={['all']}>
          <span id="filter1">Content</span>
        </InlineFilter>
        <InlineFilter filters={['not-all']}>
          <span id="filter2">Content</span>
        </InlineFilter>
      </div>
    );
    const reactNode = container.querySelector('#react-content');
    const filter1 = container.querySelector('#filter1');
    const filter2 = container.querySelector('#filter2');
    expect(reactNode).not.toBeNull();
    expect(filter1).not.toBeNull();
    expect(filter2).toBeNull();
  });

  it.each([undefined, true, {}, 'string', 1, []])(
    'should not render anything if no or an invalid filter is passed in',
    (filter) => {
      const { container } = render(
        <div>
          <InlineFilter filters={filter}>
            <span id="filter1">Content</span>
          </InlineFilter>
        </div>
      );
      const filter1 = container.querySelector('#filter1');
      expect(filter1).toBeNull();
    }
  );

  it('should display content when matching an element of the filter array', () => {
    const { container } = render(
      <div>
        <InlineFilter filters={['angular', 'react', 'vue']}>
          <span id="web-content">Content</span>
        </InlineFilter>
        <InlineFilter filters={['angular', 'vue']}>
          <span id="filter1">Content</span>
        </InlineFilter>
      </div>
    );
    const reactNode = container.querySelector('#web-content');
    const filter1 = container.querySelector('#filter1');
    expect(reactNode).not.toBeNull();
    expect(filter1).toBeNull();
  });
});
