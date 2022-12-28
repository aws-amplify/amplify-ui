import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { ScrollView } from '../ScrollView';
import { ComponentClassNames } from '../../shared/constants';

describe('ScrollView: ', () => {
  it('should render classname and custom classname', async () => {
    render(<ScrollView className="class-test" testId="test-id" />);
    const scrollView = await screen.findByTestId('test-id');
    expect(scrollView).toHaveClass(
      ComponentClassNames.ScrollView,
      'class-test'
    );
  });

  it('should render orientation classes for ScrollView', async () => {
    render(
      <div>
        <ScrollView testId="horizontal" orientation="horizontal" />
        <ScrollView testId="vertical" orientation="vertical" />
      </div>
    );

    const horizontal = await screen.findByTestId('horizontal');
    const vertical = await screen.findByTestId('vertical');

    expect(horizontal.classList).toContain(
      `${ComponentClassNames['ScrollView']}--horizontal`
    );
    expect(vertical.classList).toContain(
      `${ComponentClassNames['ScrollView']}--vertical`
    );
  });

  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<ScrollView ref={ref} testId="test-id" />);

    await screen.findByTestId('test-id');
    expect(ref.current?.nodeName).toBe('DIV');
  });

  it('should set data-orientation correctly', async () => {
    render(<ScrollView orientation="horizontal" testId="test-id" />);
    const scrollView = await screen.findByTestId('test-id');
    expect(scrollView).toHaveAttribute('data-orientation', 'horizontal');
  });
});
