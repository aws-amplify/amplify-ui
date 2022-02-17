import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconDoneOutline } from '@aws-amplify/ui-react';` → `import { MdDoneOutline } from 'react-icons/md';`
 */
export const IconDoneOutline = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconDoneOutline');
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
          d="M19.77 4.9301L21.17 6.3301L8.43 19.0701L2.83 13.4701L4.23 12.0701L8.43 16.2701L19.77 4.9301ZM19.77 2.1001L8.43 13.4401L4.23 9.2401L0 13.4701L8.43 21.9001L24 6.3301L19.77 2.1001V2.1001Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
