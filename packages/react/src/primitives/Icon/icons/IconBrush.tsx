import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconBrush } from '@aws-amplify/ui-react';` → `import { MdBrush } from 'react-icons/md';`
 */
export const IconBrush = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconBrush');
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
          d="M7 16C7.55 16 8 16.45 8 17C8 18.1 7.1 19 6 19C5.83 19 5.67 18.98 5.5 18.95C5.81 18.4 6 17.74 6 17C6 16.45 6.45 16 7 16ZM18.67 3C18.41 3 18.16 3.1 17.96 3.29L9 12.25L11.75 15L20.71 6.04C21.1 5.65 21.1 5.02 20.71 4.63L19.37 3.29C19.17 3.09 18.92 3 18.67 3V3ZM7 14C5.34 14 4 15.34 4 17C4 18.31 2.84 19 2 19C2.92 20.22 4.49 21 6 21C8.21 21 10 19.21 10 17C10 15.34 8.66 14 7 14Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
