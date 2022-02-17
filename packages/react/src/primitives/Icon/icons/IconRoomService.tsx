import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconRoomService } from '@aws-amplify/ui-react';` → `import { MdRoomService } from 'react-icons/md';`
 */
export const IconRoomService = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconRoomService');
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
          d="M18.98 17H2V19H22V17H18.98ZM21 16C20.73 11.93 17.75 8.6 13.84 7.79C13.94 7.55 14 7.28 14 7C14 5.9 13.1 5 12 5C10.9 5 10 5.9 10 7C10 7.28 10.06 7.55 10.16 7.79C6.25 8.6 3.27 11.93 3 16H21ZM12 9.58C14.95 9.58 17.47 11.41 18.5 13.99H5.5C6.53 11.41 9.05 9.58 12 9.58Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
