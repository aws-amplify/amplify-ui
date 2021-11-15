import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconDirectionsRun = (props) => {
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
          d="M13.4901 5.47998C14.5901 5.47998 15.4901 4.57998 15.4901 3.47998C15.4901 2.37998 14.5901 1.47998 13.4901 1.47998C12.3901 1.47998 11.4901 2.37998 11.4901 3.47998C11.4901 4.57998 12.3901 5.47998 13.4901 5.47998ZM9.89014 19.38L10.8901 14.98L12.9901 16.98V22.98H14.9901V15.48L12.8901 13.48L13.4901 10.48C14.7901 11.98 16.7901 12.98 18.9901 12.98V10.98C17.0901 10.98 15.4901 9.97998 14.6901 8.57998L13.6901 6.97998C13.2901 6.37998 12.6901 5.97998 11.9901 5.97998C11.6901 5.97998 11.4901 6.07998 11.1901 6.07998L5.99014 8.27998V12.98H7.99014V9.57998L9.79014 8.87998L8.19014 16.98L3.29014 15.98L2.89014 17.98L9.89014 19.38Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
