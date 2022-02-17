import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconPlaylistAddCheck } from '@aws-amplify/ui-react';` → `import { MdPlaylistAddCheck } from 'react-icons/md';`
 */
export const IconPlaylistAddCheck = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconPlaylistAddCheck');
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
          d="M14 10H2V12H14V10ZM14 6H2V8H14V6ZM2 16H10V14H2V16ZM21.5 11.5L23 13L16.01 20L11.5 15.5L13 14L16.01 17L21.5 11.5Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
