import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { useBreakpointValue } from '../../../../hooks/useBreakpointValue';
import { useMessageProps } from '../../hooks';
import { BLOCK_CLASS } from '../constants';
import { BannerMessage } from '../BannerMessage';
import { BannerMessageProps } from '../types';

jest.mock('../../../../hooks/useBreakpointValue');
jest.mock('../../hooks/');
jest.mock('../../MessageLayout', () => ({
  MessageLayout: () => 'MessageLayout',
}));

const BANNER_ALIGNMENTS: BannerMessageProps['alignment'][] = [
  'left',
  'center',
  'right',
];
const BANNER_POSITIONS: BannerMessageProps['position'][] = [
  'top',
  'middle',
  'bottom',
];
const BANNER_LOCATIONS = BANNER_ALIGNMENTS.reduce(
  (
    acc: [BannerMessageProps['alignment'], BannerMessageProps['position']][],
    alignment
  ) => {
    BANNER_POSITIONS.forEach((position) => acc.push([alignment, position]));
    return acc;
  },
  []
);
const TEST_PROPS: BannerMessageProps = { layout: 'TOP_BANNER' };

const mockUseMessageProps = useMessageProps as jest.Mock;
const mockUseBreakpointValue = useBreakpointValue as jest.Mock;

describe('BannerMessage component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseMessageProps.mockReturnValue({
      shouldRenderMessage: true,
    });
    mockUseBreakpointValue.mockReturnValue(false);
  });

  it('should render', () => {
    render(<BannerMessage {...TEST_PROPS} />);

    const bannerMessage = screen.queryByRole('dialog');
    expect(bannerMessage).toBeInTheDocument();
    expect(bannerMessage).toHaveClass(BLOCK_CLASS);
    // top right by default
    expect(bannerMessage).toHaveClass(
      `${BLOCK_CLASS}--right`,
      `${BLOCK_CLASS}--top`
    );
  });

  it.each(BANNER_LOCATIONS)(
    'should render with %s alignment and %s position',
    (alignment, position) => {
      render(
        <BannerMessage
          {...TEST_PROPS}
          alignment={alignment}
          position={position}
        />
      );

      const bannerMessage = screen.queryByRole('dialog');
      if (alignment === 'center' && position === 'middle') {
        expect(bannerMessage).toHaveClass(`${BLOCK_CLASS}--center-middle`);
      } else {
        expect(bannerMessage).toHaveClass(
          `${BLOCK_CLASS}--${alignment}`,
          `${BLOCK_CLASS}--${position}`
        );
      }
    }
  );

  it('should render with full-width modifier', () => {
    mockUseBreakpointValue.mockReturnValue(true);
    render(<BannerMessage {...TEST_PROPS} />);

    const bannerMessage = screen.getByRole('dialog');
    expect(bannerMessage).toHaveClass(`${BLOCK_CLASS}--full-width`);
  });

  it('returns null when not ready to be rendered', () => {
    mockUseMessageProps.mockReturnValue({
      shouldRenderMessage: false,
    });

    render(<BannerMessage {...TEST_PROPS} />);

    const bannerMessage = screen.queryByRole('dialog');
    expect(bannerMessage).not.toBeInTheDocument();
  });
});
