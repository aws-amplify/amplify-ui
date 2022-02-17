import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconFormatAlignCenter } from '@aws-amplify/ui-react';` → `import { MdFormatAlignCenter } from 'react-icons/md';`
 */
export const IconFormatAlignCenter = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconFormatAlignCenter');
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
          d="M7 15V17H17V15H7ZM3 21H21V19H3V21ZM3 13H21V11H3V13ZM7 7V9H17V7H7ZM3 3V5H21V3H3Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
