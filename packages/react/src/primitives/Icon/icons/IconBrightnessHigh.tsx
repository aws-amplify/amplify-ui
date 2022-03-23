import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconBrightnessHigh } from '@aws-amplify/ui-react';` → `import { MdBrightnessHigh } from 'react-icons/md';`
 */
export const IconBrightnessHigh = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconBrightnessHigh } from '@aws-amplify/ui-react'; → import { MdBrightnessHigh } from 'react-icons/md';`,
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
          d="M19.9999 8.68994V3.99994H15.3099L11.9999 0.689941L8.68994 3.99994H3.99994V8.68994L0.689941 11.9999L3.99994 15.3099V19.9999H8.68994L11.9999 23.3099L15.3099 19.9999H19.9999V15.3099L23.3099 11.9999L19.9999 8.68994ZM17.9999 14.4799V17.9999H14.4799L11.9999 20.4799L9.51994 17.9999H5.99994V14.4799L3.51994 11.9999L5.99994 9.51994V5.99994H9.51994L11.9999 3.51994L14.4799 5.99994H17.9999V9.51994L20.4799 11.9999L17.9999 14.4799ZM11.9999 5.99994C8.68994 5.99994 5.99994 8.68994 5.99994 11.9999C5.99994 15.3099 8.68994 17.9999 11.9999 17.9999C15.3099 17.9999 17.9999 15.3099 17.9999 11.9999C17.9999 8.68994 15.3099 5.99994 11.9999 5.99994ZM11.9999 15.9999C9.78994 15.9999 7.99994 14.2099 7.99994 11.9999C7.99994 9.78994 9.78994 7.99994 11.9999 7.99994C14.2099 7.99994 15.9999 9.78994 15.9999 11.9999C15.9999 14.2099 14.2099 15.9999 11.9999 15.9999Z"
          fill="currentColor"
        />
        <path
          d="M12 14.5C13.3807 14.5 14.5 13.3807 14.5 12C14.5 10.6193 13.3807 9.5 12 9.5C10.6193 9.5 9.5 10.6193 9.5 12C9.5 13.3807 10.6193 14.5 12 14.5Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
