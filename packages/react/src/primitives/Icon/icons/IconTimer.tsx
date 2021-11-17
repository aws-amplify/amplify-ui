import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconTimer = (props) => {
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
          d="M15.0701 1.00977H9.07007V3.00977H15.0701V1.00977V1.00977ZM11.0701 14.0098H13.0701V8.00977H11.0701V14.0098ZM19.1001 7.38977L20.5201 5.96977C20.0901 5.45977 19.6201 4.97977 19.1101 4.55977L17.6901 5.97977C16.1401 4.73977 14.1901 3.99977 12.0701 3.99977C7.10007 3.99977 3.07007 8.02977 3.07007 12.9998C3.07007 17.9698 7.09007 21.9998 12.0701 21.9998C17.0501 21.9998 21.0701 17.9698 21.0701 12.9998C21.0701 10.8898 20.3301 8.93977 19.1001 7.38977ZM12.0701 20.0098C8.20007 20.0098 5.07007 16.8798 5.07007 13.0098C5.07007 9.13977 8.20007 6.00977 12.0701 6.00977C15.9401 6.00977 19.0701 9.13977 19.0701 13.0098C19.0701 16.8798 15.9401 20.0098 12.0701 20.0098Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
