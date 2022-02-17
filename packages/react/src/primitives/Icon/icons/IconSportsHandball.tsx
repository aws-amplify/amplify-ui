import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSportsHandball } from '@aws-amplify/ui-react';` → `import { MdSportsHandball } from 'react-icons/md';`
 */
export const IconSportsHandball = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconSportsHandball');
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
          d="M14.2698 6.00026C13.7198 6.95026 14.0498 8.18026 14.9998 8.73026C15.9498 9.28026 17.1798 8.95026 17.7298 8.00026C18.2798 7.05026 17.9498 5.82026 16.9998 5.27026C16.0498 4.72026 14.8198 5.05026 14.2698 6.00026Z"
          fill="currentColor"
        />
        <path
          d="M15.8398 10.4103C15.8398 10.4103 14.2098 9.47033 13.2398 8.91033C10.8598 7.53033 10.0398 4.47033 11.4198 2.09033L9.68976 1.09033C8.09976 3.83033 8.59977 7.21033 10.6598 9.40033L5.50977 18.3203L7.23977 19.3203L8.73977 16.7203L10.4698 17.7203L7.46977 22.9203L9.19977 23.9203L15.4898 13.0303C16.6298 14.5803 16.8198 16.7203 15.7998 18.4903L17.5298 19.4903C19.1298 16.7403 18.8098 12.9103 15.8398 10.4103Z"
          fill="black"
        />
        <path
          d="M12.7497 3.80014C13.4697 4.21014 14.3797 3.97014 14.7997 3.25014C15.2097 2.53014 14.9697 1.62014 14.2497 1.20014C13.5297 0.790143 12.6197 1.03014 12.1997 1.75014C11.7897 2.47014 12.0297 3.39014 12.7497 3.80014Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
