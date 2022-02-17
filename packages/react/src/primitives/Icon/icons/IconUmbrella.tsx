import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconUmbrella } from '@aws-amplify/ui-react';` → `import { MdUmbrella } from 'react-icons/md';`
 */
export const IconUmbrella = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconUmbrella');
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
          d="M14.5 6.92L13 5.77V3.88V3.4C13 3.14 13.22 2.92 13.5 2.92C13.78 2.92 14 3.13 14 3.4V4H16V3.4C16 2.07 14.88 1 13.5 1C12.12 1 11 2.07 11 3.4V3.88V5.77L9.5 6.92L6 6.07L11.05 21.32C11.2 21.77 11.6 22 12 22C12.4 22 12.8 21.77 12.95 21.31L18 6.07L14.5 6.92ZM13.28 8.5L14.04 9.08L14.96 8.85L13 14.8V8.29L13.28 8.5ZM9.96 9.09L10.72 8.51L11 8.29V14.8L9.03 8.86L9.96 9.09Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
