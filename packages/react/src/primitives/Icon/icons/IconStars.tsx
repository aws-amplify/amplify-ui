import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconStars = (props) => {
  const { className, ...rest } = props;
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
          d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM19.47 9.16L14.46 8.73L12.46 4.02C15.67 4.21 18.37 6.29 19.47 9.16ZM14.4 15.42L12 13.98L9.61 15.42L10.24 12.7L8.13 10.87L10.91 10.63L12 8.06L13.09 10.62L15.87 10.86L13.76 12.69L14.4 15.42V15.42ZM11.54 4.02L9.54 8.74L4.52 9.17C5.62 6.29 8.32 4.2 11.54 4.02V4.02ZM4 12C4 11.36 4.08 10.74 4.23 10.14L8.02 13.42L6.91 18.17C5.13 16.7 4 14.48 4 12ZM7.84 18.82L12 16.31L16.16 18.81C14.94 19.56 13.52 20 11.99 20C10.47 20 9.05 19.56 7.84 18.82ZM17.09 18.17L15.98 13.42L19.77 10.14C19.91 10.73 20 11.36 20 12C20 14.48 18.86 16.7 17.09 18.17Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
