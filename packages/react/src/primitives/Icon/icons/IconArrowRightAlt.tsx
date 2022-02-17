import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconArrowRightAlt } from '@aws-amplify/ui-react';` → `import { MdArrowRightAlt } from 'react-icons/md';`
 */
export const IconArrowRightAlt = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconArrowRightAlt');
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
          d="M16.01 11H4V13H16.01V16L20 12L16.01 8V11V11Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
