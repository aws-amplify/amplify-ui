import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconPets } from '@aws-amplify/ui-react';` → `import { MdPets } from 'react-icons/md';`
 */
export const IconPets = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconPets } from '@aws-amplify/ui-react'; → import { MdPets } from 'react-icons/md';`,
  });
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
          d="M4.5 12C5.88071 12 7 10.8807 7 9.5C7 8.11929 5.88071 7 4.5 7C3.11929 7 2 8.11929 2 9.5C2 10.8807 3.11929 12 4.5 12Z"
          fill="currentColor"
        />
        <path
          d="M9 8C10.3807 8 11.5 6.88071 11.5 5.5C11.5 4.11929 10.3807 3 9 3C7.61929 3 6.5 4.11929 6.5 5.5C6.5 6.88071 7.61929 8 9 8Z"
          fill="black"
        />
        <path
          d="M15 8C16.3807 8 17.5 6.88071 17.5 5.5C17.5 4.11929 16.3807 3 15 3C13.6193 3 12.5 4.11929 12.5 5.5C12.5 6.88071 13.6193 8 15 8Z"
          fill="black"
        />
        <path
          d="M19.5 12C20.8807 12 22 10.8807 22 9.5C22 8.11929 20.8807 7 19.5 7C18.1193 7 17 8.11929 17 9.5C17 10.8807 18.1193 12 19.5 12Z"
          fill="black"
        />
        <path
          d="M17.34 14.86C16.47 13.84 15.74 12.97 14.86 11.95C14.4 11.41 13.81 10.87 13.11 10.63C13 10.59 12.89 10.56 12.78 10.54C12.53 10.5 12.26 10.5 12 10.5C11.74 10.5 11.47 10.5 11.21 10.55C11.1 10.57 10.99 10.6 10.88 10.64C10.18 10.88 9.60001 11.42 9.13001 11.96C8.26001 12.98 7.53001 13.85 6.65001 14.87C5.34001 16.18 3.73001 17.63 4.03001 19.66C4.32001 20.68 5.05001 21.69 6.36001 21.98C7.09001 22.13 9.42001 21.54 11.9 21.54H12.08C14.56 21.54 16.89 22.12 17.62 21.98C18.93 21.69 19.66 20.67 19.95 19.66C20.26 17.62 18.65 16.17 17.34 14.86V14.86Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
