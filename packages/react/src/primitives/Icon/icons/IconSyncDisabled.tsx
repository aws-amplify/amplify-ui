import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconSyncDisabled = (props) => {
  const { className, ...rest } = props;
  return (
    <View
      as="span"
      width="1em"
      height="1em"
      className={classNames(ComponentClassNames.Icon, className)}
      {...rest}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.99986 6.35V4.26C9.33986 4.43 8.70986 4.69 8.11986 5.01L9.61986 6.51C9.74986 6.46 9.86986 6.4 9.99986 6.35V6.35ZM19.9999 12C19.9999 9.79 19.0899 7.8 17.6399 6.36L19.9999 4H13.9999V10L16.2399 7.76C17.3199 8.85 17.9999 10.34 17.9999 12C17.9999 12.85 17.8099 13.65 17.4899 14.38L18.9899 15.88C19.6299 14.74 19.9999 13.41 19.9999 12ZM4.26986 4L2.85986 5.41L5.21986 7.77C4.44986 8.99 3.99986 10.44 3.99986 12C3.99986 14.21 4.90986 16.2 6.35986 17.64L3.99986 20H9.99986V14L7.75986 16.24C6.67986 15.15 5.99986 13.66 5.99986 12C5.99986 11 6.24986 10.06 6.67986 9.23L14.7599 17.31C14.5099 17.44 14.2599 17.55 13.9999 17.65V19.74C14.7999 19.53 15.5499 19.2 16.2299 18.78L18.8099 21.36L20.2199 19.95L4.26986 4Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
