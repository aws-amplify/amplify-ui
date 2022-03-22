import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconBrightnessMedium } from '@aws-amplify/ui-react';` → `import { MdBrightnessMedium } from 'react-icons/md';`
 */
export const IconBrightnessMedium = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconBrightnessMedium } from '@aws-amplify/ui-react'; → import { MdBrightnessMedium } from 'react-icons/md';`,
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
          d="M20 8.68994V3.99994H15.31L12 0.689941L8.69 3.99994H4V8.68994L0.690002 11.9999L4 15.3099V19.9999H8.69L12 23.3099L15.31 19.9999H20V15.3099L23.31 11.9999L20 8.68994ZM18 14.4799V17.9999H14.48L12 20.4799L9.52 17.9999H6V14.4799L3.52 11.9999L6 9.51994V5.99994H9.52L12 3.51994L14.48 5.99994H18V9.51994L20.48 11.9999L18 14.4799ZM12 5.99994V17.9999C15.31 17.9999 18 15.3099 18 11.9999C18 8.68994 15.31 5.99994 12 5.99994Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
