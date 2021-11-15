import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconDirections = (props) => {
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
          d="M22.4299 10.5899L13.4199 1.57993C12.6699 0.829928 11.3499 0.819928 10.5899 1.57993L1.58988 10.5799C0.809883 11.3599 0.809883 12.6199 1.58988 13.3999L10.5899 22.3999C10.9799 22.7899 11.4899 22.9799 11.9999 22.9799C12.5099 22.9799 13.0199 22.7899 13.4099 22.3999L22.3999 13.4099C23.1899 12.6499 23.1999 11.3899 22.4299 10.5899V10.5899ZM12.0099 20.9899L3.00988 11.9899L12.0099 2.98993L21.0099 11.9899L12.0099 20.9899V20.9899ZM7.99988 10.9999V14.9999H9.99988V11.9999H13.9999V14.4999L17.4999 10.9999L13.9999 7.49993V9.99993H8.99988C8.44988 9.99993 7.99988 10.4499 7.99988 10.9999Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
