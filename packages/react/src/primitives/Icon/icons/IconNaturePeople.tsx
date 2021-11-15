import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconNaturePeople = (props) => {
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
          d="M4.5 11C5.32843 11 6 10.3284 6 9.5C6 8.67157 5.32843 8 4.5 8C3.67157 8 3 8.67157 3 9.5C3 10.3284 3.67157 11 4.5 11Z"
          fill="currentColor"
        />
        <path
          d="M22.17 9.16992C22.17 5.29992 19.04 2.16992 15.17 2.16992C11.3 2.16992 8.17 5.29992 8.17 9.16992C8.17 12.6399 10.69 15.5099 14 16.0599V19.9999H6V16.9999H7V12.9999C7 12.4499 6.55 11.9999 6 11.9999H3C2.45 11.9999 2 12.4499 2 12.9999V16.9999H3V21.9999H19V19.9999H16V16.1199C19.47 15.7099 22.17 12.7599 22.17 9.16992V9.16992ZM15.17 14.1699C12.41 14.1699 10.17 11.9299 10.17 9.16992C10.17 6.40992 12.41 4.16992 15.17 4.16992C17.93 4.16992 20.17 6.40992 20.17 9.16992C20.17 11.9299 17.93 14.1699 15.17 14.1699Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
