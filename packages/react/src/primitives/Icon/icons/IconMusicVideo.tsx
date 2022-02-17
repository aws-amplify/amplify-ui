import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconMusicVideo } from '@aws-amplify/ui-react';` → `import { MdMusicVideo } from 'react-icons/md';`
 */
export const IconMusicVideo = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconMusicVideo');
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
          d="M21 3H3C1.9 3 1 3.9 1 5V19C1 20.1 1.9 21 3 21H21C22.1 21 23 20.1 23 19V5C23 3.9 22.1 3 21 3ZM21 19H3V5H21V19ZM8 15C8 13.34 9.34 12 11 12C11.35 12 11.69 12.07 12 12.18V6H17V8H14V15.03C13.98 16.67 12.65 18 11 18C9.34 18 8 16.66 8 15Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
