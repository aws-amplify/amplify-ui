import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconPlayArrow } from '@aws-amplify/ui-react';` → `import { MdPlayArrow } from 'react-icons/md';`
 */
export const IconPlayArrow = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconPlayArrow');
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
          d="M10 8.64L15.27 12L10 15.36V8.64ZM8 5V19L19 12L8 5Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
