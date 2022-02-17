import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconPriorityHigh } from '@aws-amplify/ui-react';` → `import { MdPriorityHigh } from 'react-icons/md';`
 */
export const IconPriorityHigh = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconPriorityHigh');
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
          d="M12 21C13.1046 21 14 20.1046 14 19C14 17.8954 13.1046 17 12 17C10.8954 17 10 17.8954 10 19C10 20.1046 10.8954 21 12 21Z"
          fill="currentColor"
        />
        <path d="M10 3H14V15H10V3Z" fill="black" />
      </svg>
    </View>
  );
};
