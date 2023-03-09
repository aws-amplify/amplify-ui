/**
 * Copied from src/primitives/Alert/AlertIcon.tsx because we want to re-use the icon but it is not currently expored by AlertIcon.
 * We currently don't want to make a change to the AlertIcon primitive itself and may expose the icon in the future but for now so as not to introduce cross component dependencies we have duplicated it.
 */

import * as React from 'react';
import { translate } from '@aws-amplify/ui';

import { Flex, useTheme } from '@aws-amplify/ui-react';
import { AlertIcon, useThemeBreakpoint } from '@aws-amplify/ui-react/internal';

export interface LivenessIconWithPopoverProps {}

export const LivenessIconWithPopover: React.FC<LivenessIconWithPopoverProps> =
  () => {
    const { tokens } = useTheme();
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
      <Flex
        position="relative"
        onClick={() => setShouldShowPopover(!shouldShowPopover)}
        ref={wrapperRef}
        style={{ cursor: 'pointer' }}
        testId="popover-icon"
      >
        <AlertIcon ariaHidden variation="info" />
        {shouldShowPopover && (
          <>
            <Flex
              position={'absolute'}
              top={26}
              left={3}
              style={{
                zIndex: 3,
                borderStyle: 'solid',
                borderWidth: '0 9px 9px 9px',
                borderColor: `transparent transparent ${tokens.colors.background.primary} transparent`,
              }}
            />
            <Flex
              position={'absolute'}
              top={24}
              left={2}
              style={{
                zIndex: 2,
                borderStyle: 'solid',
                borderWidth: '0 10px 10px 10px',
                borderColor: `transparent transparent ${tokens.colors.border.secondary} transparent`,
              }}
            />
            <Flex
              position={'absolute'}
              backgroundColor={`${tokens.colors.background.primary}`}
              color={`${tokens.colors.font.primary}`}
              direction={'row'}
              fontSize={tokens.fontSizes.xs}
              padding={tokens.space.small}
              top={33}
              minWidth={240}
              left={isMobileScreen ? -190 : -108}
              border={`1px solid ${tokens.colors.border.secondary}`}
              borderRadius={2}
              data-testid="popover-text"
            >
              {translate(
                'A small percentage of individuals may experience epileptic seizures when exposed to colored lights. Use caution if you, or anyone in your family, have an epileptic condition.'
              )}
            </Flex>
          </>
        )}
      </Flex>
    );
  };

LivenessIconWithPopover.displayName = 'LivenessIconWithPopover';
