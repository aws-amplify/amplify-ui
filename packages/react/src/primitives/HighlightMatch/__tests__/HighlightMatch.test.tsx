import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { HighlightMatch } from '../HighlightMatch';
import { ComponentClassNames } from '../../shared/constants';
import { getTestId } from '../../utils/getTestId';

describe('HighlightMatch:', () => {
  const testId = 'highlight-match-test-id';
  const query = 'query';

  it('should render classname correctly', async () => {
    const className = 'custom-classname';
    render(
      <HighlightMatch className={className} testId={testId} query={query}>
        There is a query.
      </HighlightMatch>
    );

    const highlightMatch = screen.queryByTestId(testId);
    expect(highlightMatch).toHaveClass(
      ComponentClassNames.HighlightMatch,
      className
    );
    const match = screen.queryByTestId(getTestId(testId, 'match'));
    expect(match).toHaveClass(ComponentClassNames.HighlightMatchHighlighted);
  });

  it('should highlight matched substring in children', async () => {
    render(
      <HighlightMatch testId={testId} query={query}>
        There is a query.
      </HighlightMatch>
    );

    const match = screen.queryByTestId(getTestId(testId, 'match'));
    expect(match).toBeInTheDocument();
    expect(match?.nodeName).toBe('STRONG');
  });

  it('should be case insensitive', async () => {
    render(
      <HighlightMatch testId={testId} query={query}>
        There is a QUERY.
      </HighlightMatch>
    );

    const match = screen.queryByTestId(getTestId(testId, 'match'));
    expect(match).toBeInTheDocument();
    expect(match?.nodeName).toBe('STRONG');
  });

  it('should not highlight any substring in children if there is no match', async () => {
    render(
      <HighlightMatch testId={testId} query={query}>
        There is no match.
      </HighlightMatch>
    );

    const match = screen.queryByTestId(getTestId(testId, 'match'));
    expect(match).toBeNull();
  });

  it('should forward ref to span DOM element', async () => {
    const ref = React.createRef<HTMLSpanElement>();

    render(
      <HighlightMatch testId={testId} query={query} ref={ref}>
        There is a query.
      </HighlightMatch>
    );

    await screen.findByTestId(testId);
    expect(ref?.current?.nodeName).toBe('SPAN');
    expect(ref?.current).toHaveClass(ComponentClassNames.HighlightMatch);
  });
});
