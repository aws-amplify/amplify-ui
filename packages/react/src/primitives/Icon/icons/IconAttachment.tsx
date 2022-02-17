import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconAttachment } from '@aws-amplify/ui-react';` → `import { MdAttachment } from 'react-icons/md';`
 */
export const IconAttachment = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconAttachment');
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
          d="M18.5 16H7C4.79 16 3 14.21 3 12C3 9.79 4.79 8 7 8H19.5C20.88 8 22 9.12 22 10.5C22 11.88 20.88 13 19.5 13H9C8.45 13 8 12.55 8 12C8 11.45 8.45 11 9 11H18.5V9.5H9C7.62 9.5 6.5 10.62 6.5 12C6.5 13.38 7.62 14.5 9 14.5H19.5C21.71 14.5 23.5 12.71 23.5 10.5C23.5 8.29 21.71 6.5 19.5 6.5H7C3.96 6.5 1.5 8.96 1.5 12C1.5 15.04 3.96 17.5 7 17.5H18.5V16Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
