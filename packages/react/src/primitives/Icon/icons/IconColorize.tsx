import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconColorize } from '@aws-amplify/ui-react';` → `import { MdColorize } from 'react-icons/md';`
 */
export const IconColorize = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconColorize');
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
          d="M17.66 5.41L18.58 6.33L15.89 9.02L14.97 8.1L17.66 5.41V5.41ZM17.67 3C17.41 3 17.16 3.1 16.96 3.29L13.84 6.41L11.91 4.5L10.5 5.91L11.92 7.33L3 16.25V21H7.75L16.67 12.08L18.09 13.5L19.5 12.09L17.58 10.17L20.7 7.05C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C18.17 3.1 17.92 3 17.67 3V3ZM6.92 19L5 17.08L13.06 9.02L14.98 10.94L6.92 19Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
