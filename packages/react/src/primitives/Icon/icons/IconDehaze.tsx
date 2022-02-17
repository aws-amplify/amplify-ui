import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconDehaze } from '@aws-amplify/ui-react';` → `import { MdDehaze } from 'react-icons/md';`
 */
export const IconDehaze = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconDehaze');
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
          d="M2 16V18H22V16H2ZM2 11V13H22V11H2ZM2 6V8H22V6H2Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
