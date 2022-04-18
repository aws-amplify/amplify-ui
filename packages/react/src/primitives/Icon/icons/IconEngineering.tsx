import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconEngineering } from '@aws-amplify/ui-react';` → `import { MdEngineering } from 'react-icons/md';`
 */
export const IconEngineering = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconEngineering } from '@aws-amplify/ui-react'; → import { MdEngineering } from 'react-icons/md';`,
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
          d="M9 15C6.33 15 1 16.34 1 19V21H17V19C17 16.34 11.67 15 9 15ZM3 19C3.22 18.28 6.31 17 9 17C11.7 17 14.8 18.29 15 19H3Z"
          fill="currentColor"
        />
        <path
          d="M4.74 9H5C5 11.21 6.79 13 9 13C11.21 13 13 11.21 13 9H13.26C13.53 9 13.75 8.78 13.75 8.51V8.49C13.75 8.22 13.53 8 13.26 8H13C13 6.52 12.19 5.25 11 4.55V5.5C11 5.78 10.78 6 10.5 6C10.22 6 10 5.78 10 5.5V4.14C9.68 4.06 9.35 4 9 4C8.65 4 8.32 4.06 8 4.14V5.5C8 5.78 7.78 6 7.5 6C7.22 6 7 5.78 7 5.5V4.55C5.81 5.25 5 6.52 5 8H4.74C4.47 8 4.25 8.22 4.25 8.49V8.52C4.25 8.78 4.47 9 4.74 9ZM11 9C11 10.1 10.1 11 9 11C7.9 11 7 10.1 7 9H11Z"
          fill="black"
        />
        <path
          d="M21.9798 6.23L22.9098 5.4L22.1598 4.1L20.9698 4.49C20.8298 4.38 20.6698 4.29 20.4998 4.22L20.2498 3H18.7498L18.4998 4.22C18.3298 4.29 18.1698 4.38 18.0198 4.49L16.8398 4.1L16.0898 5.4L17.0198 6.23C16.9998 6.4 16.9998 6.58 17.0198 6.75L16.0898 7.6L16.8398 8.9L18.0398 8.52C18.1698 8.62 18.3198 8.7 18.4698 8.77L18.7498 10H20.2498L20.5198 8.78C20.6798 8.71 20.8198 8.63 20.9598 8.53L22.1498 8.91L22.8998 7.61L21.9698 6.76C21.9998 6.57 21.9898 6.4 21.9798 6.23ZM19.4998 7.75C18.8098 7.75 18.2498 7.19 18.2498 6.5C18.2498 5.81 18.8098 5.25 19.4998 5.25C20.1898 5.25 20.7498 5.81 20.7498 6.5C20.7498 7.19 20.1898 7.75 19.4998 7.75Z"
          fill="black"
        />
        <path
          d="M19.3998 10.79L18.5498 11.07C18.4498 10.99 18.3398 10.93 18.2198 10.88L18.0398 10H16.9698L16.7898 10.87C16.6698 10.92 16.5498 10.99 16.4498 11.06L15.6098 10.78L15.0698 11.71L15.7298 12.3C15.7198 12.43 15.7198 12.55 15.7298 12.67L15.0698 13.28L15.6098 14.21L16.4698 13.94C16.5698 14.01 16.6698 14.07 16.7798 14.12L16.9598 15H18.0298L18.2198 14.13C18.3298 14.08 18.4398 14.02 18.5398 13.95L19.3898 14.22L19.9298 13.29L19.2698 12.68C19.2798 12.55 19.2798 12.43 19.2698 12.31L19.9298 11.72L19.3998 10.79ZM17.4998 13.39C17.0098 13.39 16.6098 12.99 16.6098 12.5C16.6098 12.01 17.0098 11.61 17.4998 11.61C17.9898 11.61 18.3898 12.01 18.3898 12.5C18.3898 12.99 17.9898 13.39 17.4998 13.39Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
