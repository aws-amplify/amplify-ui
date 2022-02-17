import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconGif } from '@aws-amplify/ui-react';` → `import { MdGif } from 'react-icons/md';`
 */
export const IconGif = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconGif');
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
          d="M11.5 9H13V15H11.5V9ZM9 9H6C5.4 9 5 9.5 5 10V14C5 14.5 5.4 15 6 15H9C9.6 15 10 14.5 10 14V12H8.5V13.5H6.5V10.5H10V10C10 9.5 9.6 9 9 9ZM19 10.5V9H14.5V15H16V13H18V11.5H16V10.5H19Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
