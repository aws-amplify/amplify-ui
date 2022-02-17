import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconGolfCourse } from '@aws-amplify/ui-react';` → `import { MdGolfCourse } from 'react-icons/md';`
 */
export const IconGolfCourse = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconGolfCourse');
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
          d="M19.5 21C20.3284 21 21 20.3284 21 19.5C21 18.6716 20.3284 18 19.5 18C18.6716 18 18 18.6716 18 19.5C18 20.3284 18.6716 21 19.5 21Z"
          fill="currentColor"
        />
        <path
          d="M17 5.92L9 2V20H7V18.27C5.21 18.62 4 19.26 4 20C4 21.1 6.69 22 10 22C13.31 22 16 21.1 16 20C16 19.01 13.84 18.19 11 18.03V8.98L17 5.92Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
