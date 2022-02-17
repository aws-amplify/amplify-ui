import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconCloudOff } from '@aws-amplify/ui-react';` → `import { MdCloudOff } from 'react-icons/md';`
 */
export const IconCloudOff = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconCloudOff');
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
          d="M24 14.9999C24 12.3599 21.95 10.2199 19.35 10.0399C18.67 6.58986 15.64 3.99986 12 3.99986C10.67 3.99986 9.43 4.35986 8.35 4.96986L9.84 6.45986C10.51 6.16986 11.23 5.99986 12 5.99986C15.04 5.99986 17.5 8.45986 17.5 11.4999V11.9999H19C20.66 11.9999 22 13.3399 22 14.9999C22 15.9899 21.52 16.8499 20.79 17.3999L22.2 18.8099C23.29 17.8899 24 16.5399 24 14.9999V14.9999ZM4.41 3.85986L3 5.26986L5.77 8.03986H5.35C2.34 8.35986 0 10.9099 0 13.9999C0 17.3099 2.69 19.9999 6 19.9999H17.73L19.73 21.9999L21.14 20.5899L4.41 3.85986ZM6 17.9999C3.79 17.9999 2 16.2099 2 13.9999C2 11.7899 3.79 9.99986 6 9.99986H7.73L15.73 17.9999H6Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
