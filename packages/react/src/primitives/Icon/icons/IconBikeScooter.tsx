import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconBikeScooter } from '@aws-amplify/ui-react';` → `import { MdBikeScooter } from 'react-icons/md';`
 */
export const IconBikeScooter = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconBikeScooter');
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
          d="M10 14H10.74L8.82 5.56C8.61 4.65 7.8 4 6.87 4H3V6H6.87L8.29 12.25H8.28C6.12 12.9 4.47 14.73 4.09 17H0V19H6V18C6 15.79 7.79 14 10 14Z"
          fill="currentColor"
        />
        <path
          d="M18.9999 8H18.1799L16.8299 4.31C16.5499 3.52 15.7999 3 14.9599 3H10.9999V5H14.9599L16.0599 8H10.3999L10.8599 10H14.9999C14.5699 10.58 14.2499 11.25 14.0999 12H11.3099L11.7699 14H14.0999C14.5399 16.23 16.4099 17.88 18.7499 17.99C21.5499 18.12 23.9999 15.8 23.9999 12.99C23.9999 10.2 21.7999 8 18.9999 8ZM18.9999 16C17.3199 16 15.9999 14.68 15.9999 13C15.9999 12.07 16.4099 11.27 17.0499 10.72L18.0099 13.36L19.8899 12.68L18.9199 10.01C18.9499 10.01 18.9799 10 19.0099 10C20.6899 10 22.0099 11.32 22.0099 13C22.0099 14.68 20.6799 16 18.9999 16Z"
          fill="black"
        />
        <path
          d="M10 15C8.34 15 7 16.34 7 18C7 19.66 8.34 21 10 21C11.66 21 13 19.66 13 18C13 16.34 11.66 15 10 15ZM10 19C9.45 19 9 18.55 9 18C9 17.45 9.45 17 10 17C10.55 17 11 17.45 11 18C11 18.55 10.55 19 10 19Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
