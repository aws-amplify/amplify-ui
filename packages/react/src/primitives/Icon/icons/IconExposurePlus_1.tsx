import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconExposurePlus_1 } from '@aws-amplify/ui-react';` → `import { MdExposurePlus_1 } from 'react-icons/md';`
 */
export const IconExposurePlus_1 = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconExposurePlus_1');
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
          d="M10 7H8V11H4V13H8V17H10V13H14V11H10V7ZM20 18H18V7.38L15 8.4V6.7L19.7 5H20V18Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
