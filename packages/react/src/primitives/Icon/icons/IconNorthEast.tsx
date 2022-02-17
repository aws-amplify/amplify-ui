import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconNorthEast } from '@aws-amplify/ui-react';` → `import { MdNorthEast } from 'react-icons/md';`
 */
export const IconNorthEast = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconNorthEast');
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
          d="M9 5V7H15.59L4 18.59L5.41 20L17 8.41V15H19V5H9Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
