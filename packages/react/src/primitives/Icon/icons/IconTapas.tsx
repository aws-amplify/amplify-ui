import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconTapas = (props) => {
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
          d="M22 10V1H14V10C14 11.86 15.28 13.41 17 13.86V21H15V23H21V21H19V13.86C20.72 13.41 22 11.86 22 10ZM20 3V6H16V3H20ZM16 10V8H20V10C20 11.1 19.1 12 18 12C16.9 12 16 11.1 16 10ZM10 9H8V8H10C11.38 8 12.5 6.88 12.5 5.5C12.5 4.12 11.38 3 10 3H8V1H6V3H4C2.62 3 1.5 4.12 1.5 5.5C1.5 6.88 2.62 8 4 8H6V9H4C2.62 9 1.5 10.12 1.5 11.5C1.5 12.88 2.62 14 4 14H6V23H8V14H10C11.38 14 12.5 12.88 12.5 11.5C12.5 10.12 11.38 9 10 9ZM4 6C3.72 6 3.5 5.78 3.5 5.5C3.5 5.22 3.72 5 4 5H10C10.28 5 10.5 5.22 10.5 5.5C10.5 5.78 10.28 6 10 6H4ZM10 12H4C3.72 12 3.5 11.78 3.5 11.5C3.5 11.22 3.72 11 4 11H10C10.28 11 10.5 11.22 10.5 11.5C10.5 11.78 10.28 12 10 12Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
