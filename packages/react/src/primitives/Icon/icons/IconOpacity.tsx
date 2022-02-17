import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconOpacity } from '@aws-amplify/ui-react';` → `import { MdOpacity } from 'react-icons/md';`
 */
export const IconOpacity = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconOpacity');
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
          d="M17.66 8.0001L12 2.3501L6.34 8.0001C4.78 9.5601 4 11.6401 4 13.6401C4 15.6401 4.78 17.7501 6.34 19.3101C7.9 20.8701 9.95 21.6601 12 21.6601C14.05 21.6601 16.1 20.8701 17.66 19.3101C19.22 17.7501 20 15.6401 20 13.6401C20 11.6401 19.22 9.5601 17.66 8.0001ZM6 14.0001C6.01 12.0001 6.62 10.7301 7.76 9.6001L12 5.2701L16.24 9.6501C17.38 10.7701 17.99 12.0001 18 14.0001H6Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
