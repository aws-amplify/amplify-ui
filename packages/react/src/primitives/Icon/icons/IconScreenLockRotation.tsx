import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconScreenLockRotation = (props) => {
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
          d="M22.3 13.77L19.73 11.2L18.32 12.61L20.5401 14.83L14.88 20.49L3.56005 9.17L9.22005 3.51L11.32 5.61L12.73 4.2L10.28 1.75C9.69005 1.16 8.74005 1.16 8.16005 1.75L1.80005 8.11C1.21005 8.7 1.21005 9.65 1.80005 10.23L13.82 22.25C14.41 22.84 15.36 22.84 15.94 22.25L22.3 15.89C22.89 15.3 22.89 14.35 22.3 13.77ZM7.52005 21.48C4.25005 19.94 1.91005 16.76 1.55005 13H0.0500488C0.560049 19.16 5.71005 24 12 24L12.66 23.97L8.85005 20.15L7.52005 21.48V21.48ZM15.05 10H20.05C20.6 10 21.05 9.55 21.05 9V5C21.05 4.45 20.6 4 20.05 4V3.5C20.05 2.12 18.93 1 17.55 1C16.17 1 15.05 2.12 15.05 3.5V4C14.5 4 14.05 4.45 14.05 5V9C14.05 9.55 14.5 10 15.05 10ZM15.85 3.5C15.85 2.56 16.61 1.8 17.55 1.8C18.49 1.8 19.25 2.56 19.25 3.5V4H15.85V3.5V3.5Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
