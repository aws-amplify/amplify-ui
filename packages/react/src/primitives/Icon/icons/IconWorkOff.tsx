import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconWorkOff = (props) => {
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
          d="M9.99999 3.99984H14V5.99984H10.4L12.4 7.99984H20V15.5998L22 17.5998V7.99984C22 6.88984 21.11 5.99984 20 5.99984H16V3.99984C16 2.88984 15.11 1.99984 14 1.99984H9.99999C9.00999 1.99984 8.19999 2.69984 8.03999 3.63984L9.99999 5.59984V3.99984ZM3.39999 1.83984L1.98999 3.24984L4.73999 5.99984H3.99999C2.88999 5.99984 2.00999 6.88984 2.00999 7.99984L1.99999 18.9998C1.99999 20.1098 2.88999 20.9998 3.99999 20.9998H19.74L21.74 22.9998L23.15 21.5898L3.39999 1.83984ZM3.99999 18.9998V7.99984H6.73999L17.74 18.9998H3.99999Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
