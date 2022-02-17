import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconQuickreply } from '@aws-amplify/ui-react';` → `import { MdQuickreply } from 'react-icons/md';`
 */
export const IconQuickreply = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconQuickreply');
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
          d="M4 17.17V4H20V10H22V4C22 2.9 21.1 2 20 2H4C2.9 2 2.01 2.9 2.01 4L2 22L6 18H15V16H5.17L4 17.17Z"
          fill="currentColor"
        />
        <path d="M22.5 16H20.3L22 12H17V18H19V23L22.5 16Z" fill="black" />
      </svg>
    </View>
  );
};
