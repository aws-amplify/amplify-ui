import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconWaterDamage } from '@aws-amplify/ui-react';` → `import { MdWaterDamage } from 'react-icons/md';`
 */
export const IconWaterDamage = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconWaterDamage');
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
          d="M12 3L2 12H5V20H19V12H22L12 3ZM7 18V10.19L12 5.69L17 10.19V18H7ZM14 14C14 15.1 13.1 16 12 16C10.9 16 10 15.1 10 14C10 12.9 12 10 12 10C12 10 14 12.9 14 14Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
