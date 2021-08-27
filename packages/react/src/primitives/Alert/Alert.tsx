import React, { useState, useCallback } from 'react';
import { ComponentClassNames } from '../shared/constants';
import classNames from 'classnames';
import { AlertProps } from '../types';
import { View } from '../View';
import { Flex } from '../Flex';
import { Heading } from '../Heading';
import { Button } from '../Button';
import { AlertIcon } from './AlertIcon';
import { IconClose } from '../Icon';

export const Alert: React.FC<AlertProps> = ({
  alignContent,
  alignItems = 'center',
  children,
  className,
  direction,
  gap,
  hasIcon = true,
  heading,
  headingLevel,
  iconSize,
  isDismissible = false,
  justifyContent = 'space-between',
  onDismiss = () => {},
  variation,
  wrap,
  ...rest
}) => {
  const [dismissed, setDismissed] = useState<boolean>(false);

  const dismissAlert = useCallback(() => {
    setDismissed(!dismissed);
    onDismiss();
  }, [setDismissed, onDismiss]);

  return (
    !dismissed && (
      <Flex
        alignContent={alignContent}
        alignItems={alignItems}
        className={classNames(ComponentClassNames.Alert, className)}
        data-variation={variation}
        direction={direction}
        gap={gap}
        justifyContent={justifyContent}
        wrap={wrap}
        {...rest}
      >
        {/* Make a className, put alignItems="center" into a CSS variable */}
        <Flex alignItems="center">
          {hasIcon && <AlertIcon variation={variation} iconSize={iconSize} />}
          <View>
            {heading && (
              <Heading
                className={ComponentClassNames.AlertHeading}
                level={headingLevel}
              >
                {heading}
              </Heading>
            )}
            {children}
          </View>
        </Flex>
        {isDismissible && (
          <Button variation="link" onClick={dismissAlert}>
            <IconClose size={iconSize} />
          </Button>
        )}
      </Flex>
    )
  );
};
