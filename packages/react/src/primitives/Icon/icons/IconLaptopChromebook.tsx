import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconLaptopChromebook } from '@aws-amplify/ui-react';` → `import { MdLaptopChromebook } from 'react-icons/md';`
 */
export const IconLaptopChromebook = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconLaptopChromebook');
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
          d="M22 18V3H2V18H0V20H24V18H22ZM14 18H10V17H14V18ZM20 15H4V5H20V15Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
