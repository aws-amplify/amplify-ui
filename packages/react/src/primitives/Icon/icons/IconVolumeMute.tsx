import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconVolumeMute } from '@aws-amplify/ui-react';` → `import { MdVolumeMute } from 'react-icons/md';`
 */
export const IconVolumeMute = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconVolumeMute');
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
          d="M14 8.83V15.17L11.83 13H9V11H11.83L14 8.83ZM16 4L11 9H7V15H11L16 20V4Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
