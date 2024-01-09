/**
 * Copied from src/primitives/Alert/AlertIcon.tsx because we want to re-use the icon but it is not currently expored by AlertIcon.
 * We currently don't want to make a change to the AlertIcon primitive itself and may expose the icon in the future but for now so as not to introduce cross component dependencies we have duplicated it.
 */

import * as React from 'react';

import { Button, Flex } from '@aws-amplify/ui-react';
import { AlertIcon, useThemeBreakpoint } from '@aws-amplify/ui-react/internal';
import { LivenessClassNames } from '../types/classNames';

export interface LivenessIconWithPopoverProps {
  children: string;
  headingText: string;
  labelText: string;
}

export const LivenessIconWithPopover: React.FC<
  LivenessIconWithPopoverProps
> = ({ children, headingText, labelText }) => {
  const breakpoint = useThemeBreakpoint();
  const [shouldShowPopover, setShouldShowPopover] = React.useState(false);
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const isMobileScreen = breakpoint === 'base';

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        shouldShowPopover &&
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShouldShowPopover(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef, shouldShowPopover]);

  return (
    <div className={LivenessClassNames.Popover} ref={wrapperRef}>
      <Button
        aria-controls="photosensitivity-description"
        aria-expanded={shouldShowPopover}
        role="alertdialog"
        aria-label={labelText}
        aria-describedby="photosensitivity-description"
        colorTheme="info"
        id="popover-button"
        onClick={() => setShouldShowPopover(!shouldShowPopover)}
        testId="popover-icon"
      >
        <AlertIcon ariaHidden variation="info" />
      </Button>
      {shouldShowPopover && (
        <>
          <Flex className={LivenessClassNames.PopoverAnchor} />
          <Flex className={LivenessClassNames.PopoverAnchorSecondary} />
          <Flex
            aria-hidden={!shouldShowPopover}
            aria-label={headingText}
            className={LivenessClassNames.PopoverContainer}
            data-testid="popover-text"
            id="photosensitivity-description"
            left={isMobileScreen ? -190 : -108}
            role="alertdialog"
          >
            {children}
          </Flex>
        </>
      )}
    </div>
  );
};

LivenessIconWithPopover.displayName = 'LivenessIconWithPopover';
