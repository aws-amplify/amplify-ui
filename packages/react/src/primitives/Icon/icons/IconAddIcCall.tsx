import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconAddIcCall } from '@aws-amplify/ui-react';` → `import { MdAddIcCall } from 'react-icons/md';`
 */
export const IconAddIcCall = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconAddIcCall } from '@aws-amplify/ui-react'; → import { MdAddIcCall } from 'react-icons/md';`,
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
          d="M20 15.4502C18.75 15.4502 17.55 15.2502 16.43 14.8802C16.33 14.8502 16.22 14.8302 16.12 14.8302C15.86 14.8302 15.61 14.9302 15.41 15.1202L13.21 17.3202C10.38 15.8802 8.06 13.5702 6.62 10.7302L8.82 8.5202C9.1 8.2602 9.18 7.8702 9.07 7.5202C8.7 6.4002 8.5 5.2002 8.5 3.9502C8.5 3.4002 8.05 2.9502 7.5 2.9502H4C3.45 2.9502 3 3.4002 3 3.9502C3 13.3402 10.61 20.9502 20 20.9502C20.55 20.9502 21 20.5002 21 19.9502V16.4502C21 15.9002 20.55 15.4502 20 15.4502ZM5.03 4.9502H6.53C6.6 5.8302 6.75 6.7002 6.98 7.5302L5.78 8.7402C5.38 7.5302 5.12 6.2702 5.03 4.9502ZM19 18.9202C17.68 18.8302 16.4 18.5702 15.2 18.1602L16.4 16.9602C17.25 17.2002 18.12 17.3502 19 17.4102V18.9202ZM18 5.9502V2.9502H16V5.9502H13V7.9502H16V10.9502H18V7.9502H21V5.9502H18Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
