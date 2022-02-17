import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconPhonelinkRing } from '@aws-amplify/ui-react';` → `import { MdPhonelinkRing } from 'react-icons/md';`
 */
export const IconPhonelinkRing = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconPhonelinkRing');
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
          d="M20.1 7.7L19.1 8.7C20.9 10.5 20.9 13.3 19.1 15.2L20.1 16.2C22.6 13.9 22.6 10.1 20.1 7.7V7.7ZM18 9.8L17 10.8C17.5 11.5 17.5 12.4 17 13.1L18 14.1C19.2 12.9 19.2 11.1 18 9.8ZM14 1H4C2.9 1 2 1.9 2 3V21C2 22.1 2.9 23 4 23H14C15.1 23 16 22.1 16 21V3C16 1.9 15.1 1 14 1ZM14 20H4V4H14V20Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
