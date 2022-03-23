import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconBrightnessAuto } from '@aws-amplify/ui-react';` → `import { MdBrightnessAuto } from 'react-icons/md';`
 */
export const IconBrightnessAuto = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconBrightnessAuto } from '@aws-amplify/ui-react'; → import { MdBrightnessAuto } from 'react-icons/md';`,
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
          d="M10.9999 6.99994L7.79994 15.9999H9.69994L10.3999 13.9999H13.5999L14.2999 15.9999H16.1999L12.9999 6.99994H10.9999ZM10.8499 12.6499L11.9999 8.99994L13.1499 12.6499H10.8499V12.6499ZM19.9999 8.68994V3.99994H15.3099L11.9999 0.689941L8.68994 3.99994H3.99994V8.68994L0.689941 11.9999L3.99994 15.3099V19.9999H8.68994L11.9999 23.3099L15.3099 19.9999H19.9999V15.3099L23.3099 11.9999L19.9999 8.68994ZM17.9999 14.4799V17.9999H14.4799L11.9999 20.4799L9.51994 17.9999H5.99994V14.4799L3.51994 11.9999L5.99994 9.51994V5.99994H9.51994L11.9999 3.51994L14.4799 5.99994H17.9999V9.51994L20.4799 11.9999L17.9999 14.4799Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
