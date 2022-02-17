import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconArchitecture } from '@aws-amplify/ui-react';` → `import { MdArchitecture } from 'react-icons/md';`
 */
export const IconArchitecture = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconArchitecture');
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
          d="M6.35986 18.7799L6.60986 20.9999L8.22986 19.4599L10.9999 11.8599C10.3199 11.6899 9.71986 11.3499 9.22986 10.8799L6.35986 18.7799Z"
          fill="currentColor"
        />
        <path
          d="M14.77 10.8799C14.28 11.3499 13.67 11.6899 13 11.8599L15.77 19.4599L17.39 20.9999L17.65 18.7799L14.77 10.8799Z"
          fill="black"
        />
        <path
          d="M15 8C15 6.7 14.16 5.6 13 5.18V3H11V5.18C9.84 5.6 9 6.7 9 8C9 9.66 10.34 11 12 11C13.66 11 15 9.66 15 8ZM12 9C11.45 9 11 8.55 11 8C11 7.45 11.45 7 12 7C12.55 7 13 7.45 13 8C13 8.55 12.55 9 12 9Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
