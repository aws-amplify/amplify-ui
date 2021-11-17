import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconScreenRotation = (props) => {
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
          d="M16.48 2.52C19.75 4.07 22.0901 7.24 22.4501 11H23.9501C23.4401 4.84 18.29 0 12 0L11.34 0.03L15.15 3.84L16.48 2.52V2.52ZM10.23 1.75C9.64005 1.16 8.69005 1.16 8.11005 1.75L1.75005 8.11C1.16005 8.7 1.16005 9.65 1.75005 10.23L13.77 22.25C14.36 22.84 15.31 22.84 15.89 22.25L22.25 15.89C22.84 15.3 22.84 14.35 22.25 13.77L10.23 1.75ZM14.83 21.19L2.81005 9.17L9.17005 2.81L21.1901 14.83L14.83 21.19V21.19ZM7.52005 21.48C4.25005 19.94 1.91005 16.76 1.55005 13H0.0500488C0.560049 19.16 5.71005 24 12 24L12.66 23.97L8.85005 20.16L7.52005 21.48V21.48Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
