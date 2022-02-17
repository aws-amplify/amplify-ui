import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconBiotech } from '@aws-amplify/ui-react';` → `import { MdBiotech } from 'react-icons/md';`
 */
export const IconBiotech = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconBiotech');
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
          d="M7 19C5.9 19 5 19.9 5 21H19C19 19.9 18.1 19 17 19H13V17H16C17.1 17 18 16.1 18 15H10C8.34 15 7 13.66 7 12C7 10.91 7.59 9.96 8.47 9.43C8.88 10.02 9.53 10.43 10.3 10.49C11 10.55 11.66 10.3 12.15 9.87L12.74 11.48L13.68 11.14L14.02 12.08L15.9 11.4L15.56 10.46L16.5 10.12L13.76 2.6L12.82 2.94L12.48 2L10.6 2.68L10.94 3.62L10 3.97L10.56 5.52C9.39 5.48 8.37 6.27 8.08 7.38C6.27 8.14 5 9.92 5 12C5 14.76 7.24 17 10 17V19H7ZM12.86 4.52L14.57 9.22L13.63 9.56L11.92 4.86L12.86 4.52ZM10.5 7C11.05 7 11.5 7.45 11.5 8C11.5 8.55 11.05 9 10.5 9C9.95 9 9.5 8.55 9.5 8C9.5 7.45 9.95 7 10.5 7Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
