import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSubtitles } from '@aws-amplify/ui-react';` → `import { MdSubtitles } from 'react-icons/md';`
 */
export const IconSubtitles = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconSubtitles');
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
          d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 18H4V6H20V18ZM6 10H8V12H6V10ZM6 14H14V16H6V14ZM16 14H18V16H16V14ZM10 10H18V12H10V10Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
