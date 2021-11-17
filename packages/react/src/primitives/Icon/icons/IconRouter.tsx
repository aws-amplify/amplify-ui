import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconRouter = (props) => {
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
          d="M16 4.2C17.5 4.2 19 4.8 20.2 5.9L21 5.1C19.6 3.7 17.8 3 16 3C14.2 3 12.4 3.7 11 5.1L11.8 5.9C13 4.8 14.5 4.2 16 4.2ZM12.7 6.7L13.5 7.5C14.2 6.8 15.1 6.5 16 6.5C16.9 6.5 17.8 6.8 18.5 7.5L19.3 6.7C18.4 5.8 17.2 5.3 16 5.3C14.8 5.3 13.6 5.8 12.7 6.7V6.7ZM19 13H17V9H15V13H5C3.9 13 3 13.9 3 15V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V15C21 13.9 20.1 13 19 13ZM19 19H5V15H19V19ZM6 16H8V18H6V16ZM9.5 16H11.5V18H9.5V16ZM13 16H15V18H13V16Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
