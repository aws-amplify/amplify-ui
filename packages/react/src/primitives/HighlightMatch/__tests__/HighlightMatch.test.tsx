import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { HighlightMatch } from '../HighlightMatch';
import { ComponentClassNames } from '../../shared/constants';

const TEST_ID = 'highlight-match-test-id';
const MATCH_TEST_ID = 'highlight-match-test-id-match';

describe('HighlightMatch:', () => {
  const query = 'query';

  it('should render classname correctly', () => {
    const className = 'custom-classname';
    render(
      <HighlightMatch className={className} testId={TEST_ID} query={query}>
        There is a query.
      </HighlightMatch>
    );

    const highlightMatch = screen.queryByTestId(TEST_ID);
    expect(highlightMatch).toHaveClass(
      ComponentClassNames.HighlightMatch,
      className
    );
    const match = screen.queryByTestId(MATCH_TEST_ID);
    expect(match).toHaveClass(ComponentClassNames.HighlightMatchHighlighted);
  });

  it('should highlight matched substring in children', () => {
    render(
      <HighlightMatch testId={TEST_ID} query={query}>
        There is a query.
      </HighlightMatch>
    );

    const match = screen.queryByTestId(MATCH_TEST_ID);
    expect(match).toBeInTheDocument();
    expect(match?.nodeName).toBe('STRONG');
  });

  it('should be case insensitive', () => {
    render(
      <HighlightMatch testId={TEST_ID} query={query}>
        There is a QUERY.
      </HighlightMatch>
    );

    const match = screen.queryByTestId(MATCH_TEST_ID);
    expect(match).toBeInTheDocument();
    expect(match?.nodeName).toBe('STRONG');
  });

  it('should not highlight any substring in children if there is no match', () => {
    render(
      <HighlightMatch testId={TEST_ID} query={query}>
        There is no match.
      </HighlightMatch>
    );

    const match = screen.queryByTestId(MATCH_TEST_ID);
    expect(match).toBeNull();
  });

  it('should forward ref to span DOM element', async () => {
    const ref = React.createRef<HTMLSpanElement>();

    render(
      <HighlightMatch testId={TEST_ID} query={query} ref={ref}>
        There is a query.
      </HighlightMatch>
    );

    await screen.findByTestId(TEST_ID);
    expect(ref?.current?.nodeName).toBe('SPAN');
    expect(ref?.current).toHaveClass(ComponentClassNames.HighlightMatch);
  });
});
