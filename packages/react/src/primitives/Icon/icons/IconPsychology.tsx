import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconPsychology } from '@aws-amplify/ui-react';` → `import { MdPsychology } from 'react-icons/md';`
 */
export const IconPsychology = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconPsychology');
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
          d="M15.8201 7.22L14.8201 7.62C14.6101 7.46 14.3901 7.33 14.1501 7.23L14.0001 6.17C13.9801 6.07 13.9001 6 13.8001 6H12.2001C12.1001 6 12.0201 6.07 12.0101 6.17L11.8601 7.23C11.6201 7.33 11.3901 7.46 11.1901 7.62L10.1901 7.22C10.1001 7.19 9.99005 7.22 9.95005 7.31L9.15005 8.69C9.10005 8.78 9.12005 8.89 9.20005 8.95L10.0501 9.61C10.0201 9.73 10.0001 9.87 10.0001 10C10.0001 10.13 10.0101 10.26 10.0301 10.39L9.19005 11.05C9.11005 11.11 9.09005 11.22 9.14005 11.3L9.94005 12.69C9.99005 12.78 10.0901 12.81 10.1901 12.78L11.1801 12.38C11.3901 12.54 11.6101 12.67 11.8601 12.77L12.0001 13.83C12.0201 13.93 12.1001 14 12.2001 14H13.8001C13.9001 14 13.9801 13.93 14.0001 13.83L14.1501 12.77C14.3901 12.67 14.6201 12.54 14.8201 12.38L15.8101 12.78C15.9001 12.82 16.0101 12.78 16.0501 12.69L16.8501 11.3C16.9001 11.21 16.8801 11.11 16.8001 11.05L15.9701 10.39C15.9901 10.26 16.0001 10.13 16.0001 10C16.0001 9.86 15.9901 9.73 15.9701 9.61L16.8201 8.95C16.9001 8.89 16.9201 8.78 16.8701 8.69L16.0701 7.31C16.0201 7.22 15.9101 7.19 15.8201 7.22ZM13.0001 11.43C12.2101 11.43 11.5701 10.79 11.5701 10C11.5701 9.21 12.2101 8.57 13.0001 8.57C13.7901 8.57 14.4301 9.21 14.4301 10C14.4301 10.79 13.7901 11.43 13.0001 11.43Z"
          fill="currentColor"
        />
        <path
          d="M19.9398 9.06C19.5098 5.79 16.7098 3.2 13.4098 3.01C13.2698 3 13.1398 3 12.9998 3C9.46985 3 6.56985 5.61 6.07985 9L4.14985 12.48C3.73985 13.14 4.21985 14 4.99985 14H5.99985V16C5.99985 17.1 6.89985 18 7.99985 18H8.99985V21H15.9998V16.32C18.6198 15.07 20.3498 12.24 19.9398 9.06ZM14.8898 14.63L13.9998 15.05V19H10.9998V16H7.99985V12H6.69985L8.02985 9.67C8.20985 7.06 10.3498 5 12.9998 5C15.7598 5 17.9998 7.24 17.9998 10C17.9998 12.09 16.7098 13.88 14.8898 14.63Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
