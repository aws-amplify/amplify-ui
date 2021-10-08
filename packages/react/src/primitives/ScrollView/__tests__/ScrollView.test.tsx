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

  it('should set data-orientation correctly', async () => {
    render(<ScrollView orientation="horizontal" testId="test-id" />);
    const scrollView = await screen.findByTestId('test-id');
    expect(scrollView).toHaveAttribute('data-orientation', 'horizontal');
  });
});
