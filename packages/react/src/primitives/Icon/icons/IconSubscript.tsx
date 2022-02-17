import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSubscript } from '@aws-amplify/ui-react';` → `import { MdSubscript } from 'react-icons/md';`
 */
export const IconSubscript = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconSubscript');
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
          d="M21.9999 18H19.9999V19H22.9999V20H18.9999V18C18.9999 17.45 19.4499 17 19.9999 17H21.9999V16H18.9999V15H21.9999C22.5499 15 22.9999 15.45 22.9999 16V17C22.9999 17.55 22.5499 18 21.9999 18ZM5.87988 18H8.53988L11.9399 12.58H12.0599L15.4599 18H18.1199L13.4699 10.73L17.8099 4H15.1299L12.0599 8.99H11.9399L8.84988 4H6.18988L10.5099 10.73L5.87988 18Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
