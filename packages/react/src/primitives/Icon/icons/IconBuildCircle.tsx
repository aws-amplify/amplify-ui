import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconBuildCircle } from '@aws-amplify/ui-react';` → `import { MdBuildCircle } from 'react-icons/md';`
 */
export const IconBuildCircle = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconBuildCircle');
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
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M13.49 11.3798C13.92 10.1598 13.66 8.73984 12.68 7.75984C11.57 6.64984 9.88999 6.45984 8.57999 7.16984L10.93 9.51984L9.51999 10.9298L7.16999 8.57984C6.45999 9.89984 6.64999 11.5698 7.75999 12.6798C8.73999 13.6598 10.16 13.9198 11.38 13.4898L14.79 16.8998C14.99 17.0998 15.3 17.0998 15.5 16.8998L16.9 15.4998C17.1 15.2998 17.1 14.9898 16.9 14.7898L13.49 11.3798Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
