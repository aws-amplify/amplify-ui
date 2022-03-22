import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSpeed } from '@aws-amplify/ui-react';` → `import { MdSpeed } from 'react-icons/md';`
 */
export const IconSpeed = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconSpeed } from '@aws-amplify/ui-react'; → import { MdSpeed } from 'react-icons/md';`,
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
          d="M20.38 8.57012L19.15 10.4201C19.7432 11.6032 20.0336 12.915 19.9952 14.2378C19.9568 15.5607 19.5908 16.8534 18.93 18.0001H5.06999C4.21116 16.5102 3.85528 14.7832 4.05513 13.0752C4.25497 11.3671 4.9999 9.76895 6.17947 8.51755C7.35904 7.26615 8.91046 6.42816 10.6037 6.12782C12.297 5.82747 14.042 6.08076 15.58 6.85012L17.43 5.62012C15.5465 4.41234 13.3123 3.87113 11.0849 4.08306C8.85744 4.29499 6.76543 5.24782 5.14348 6.78913C3.52153 8.33045 2.46335 10.3712 2.13821 12.5849C1.81306 14.7987 2.23974 17.0575 3.34999 19.0001C3.5245 19.3024 3.77508 19.5537 4.07682 19.7292C4.37856 19.9046 4.72096 19.998 5.06999 20.0001H18.92C19.2724 20.0015 19.6189 19.9098 19.9245 19.7342C20.2301 19.5586 20.4838 19.3053 20.66 19.0001C21.5814 17.404 22.0438 15.5844 21.9961 13.7421C21.9485 11.8998 21.3926 10.1064 20.39 8.56012L20.38 8.57012Z"
          fill="currentColor"
        />
        <path
          d="M10.59 15.4099C10.7757 15.5959 10.9963 15.7434 11.2391 15.844C11.4819 15.9447 11.7422 15.9965 12.005 15.9965C12.2678 15.9965 12.5281 15.9447 12.7709 15.844C13.0137 15.7434 13.2342 15.5959 13.42 15.4099L19.08 6.91992L10.59 12.5799C10.404 12.7657 10.2565 12.9862 10.1559 13.229C10.0552 13.4718 10.0034 13.7321 10.0034 13.9949C10.0034 14.2578 10.0552 14.518 10.1559 14.7608C10.2565 15.0036 10.404 15.2242 10.59 15.4099V15.4099Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
