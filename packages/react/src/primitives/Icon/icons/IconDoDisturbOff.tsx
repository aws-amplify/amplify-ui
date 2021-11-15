import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconDoDisturbOff = (props) => {
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
          d="M12 4C16.41 4 20 7.59 20 12C20 13.41 19.63 14.73 18.99 15.88L20.45 17.34C21.43 15.79 22 13.96 22 12C22 6.48 17.52 2 12 2C10.04 2 8.21 2.57 6.67 3.55L8.13 5.01C9.27 4.37 10.59 4 12 4ZM17 11H14.12L16.12 13H17V11ZM2.41 2.13L1 3.54L3.78 6.32C2.66 7.93 2 9.89 2 12C2 17.52 6.48 22 12 22C14.11 22 16.07 21.34 17.68 20.22L20.46 23L21.87 21.59L2.41 2.13ZM12 20C7.59 20 4 16.41 4 12C4 10.44 4.45 9 5.23 7.77L8.46 11H7V13H10.46L16.23 18.77C15 19.55 13.56 20 12 20Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
