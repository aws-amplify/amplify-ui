import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSettingsBluetooth } from '@aws-amplify/ui-react';` → `import { MdSettingsBluetooth } from 'react-icons/md';`
 */
export const IconSettingsBluetooth = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconSettingsBluetooth');
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
          d="M11 24H13V22H11V24ZM7 24H9V22H7V24ZM15 24H17V22H15V24ZM17.71 5.71L12 0H11V7.59L6.41 3L5 4.41L10.59 10L5 15.59L6.41 17L11 12.41V20H12L17.71 14.29L13.41 10L17.71 5.71V5.71ZM13 3.83L14.88 5.71L13 7.59V3.83ZM14.88 14.29L13 16.17V12.41L14.88 14.29V14.29Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
