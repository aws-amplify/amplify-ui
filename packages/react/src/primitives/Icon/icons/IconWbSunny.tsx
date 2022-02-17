import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconWbSunny } from '@aws-amplify/ui-react';` → `import { MdWbSunny } from 'react-icons/md';`
 */
export const IconWbSunny = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconWbSunny');
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
          d="M6.76 4.8398L4.96 3.0498L3.55 4.4598L5.34 6.2498L6.76 4.8398ZM1 10.4998H4V12.4998H1V10.4998ZM11 0.549805H13V3.4998H11V0.549805ZM19.04 3.0448L20.448 4.4518L18.658 6.2418L17.251 4.8338L19.04 3.0448ZM17.24 18.1598L19.03 19.9598L20.44 18.5498L18.64 16.7598L17.24 18.1598ZM20 10.4998H23V12.4998H20V10.4998ZM12 5.4998C8.69 5.4998 6 8.1898 6 11.4998C6 14.8098 8.69 17.4998 12 17.4998C15.31 17.4998 18 14.8098 18 11.4998C18 8.1898 15.31 5.4998 12 5.4998ZM12 15.4998C9.79 15.4998 8 13.7098 8 11.4998C8 9.2898 9.79 7.4998 12 7.4998C14.21 7.4998 16 9.2898 16 11.4998C16 13.7098 14.21 15.4998 12 15.4998ZM11 19.4998H13V22.4498H11V19.4998ZM3.55 18.5398L4.96 19.9498L6.75 18.1498L5.34 16.7398L3.55 18.5398Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
