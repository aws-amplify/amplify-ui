import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconTableChart } from '@aws-amplify/ui-react';` → `import { MdTableChart } from 'react-icons/md';`
 */
export const IconTableChart = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconTableChart');
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
          d="M20 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H20C21.1 21 22 20.1 22 19V5C22 3.9 21.1 3 20 3ZM20 5V8H5V5H20ZM15 19H10V10H15V19ZM5 10H8V19H5V10ZM17 19V10H20V19H17Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
