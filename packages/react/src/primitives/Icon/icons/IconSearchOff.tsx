import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconSearchOff = (props) => {
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
          d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.50001 3C6.08001 3 3.28001 5.64 3.03001 9H5.05001C5.30001 6.75 7.18001 5 9.50001 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.50001 14C9.33001 14 9.17001 13.97 9.00001 13.95V15.97C9.17001 15.99 9.33001 16 9.50001 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14Z"
          fill="currentColor"
        />
        <path
          d="M6.47001 10.8198L4.00001 13.2898L1.53001 10.8198L0.820007 11.5298L3.29001 13.9998L0.820007 16.4698L1.53001 17.1798L4.00001 14.7098L6.47001 17.1798L7.18001 16.4698L4.71001 13.9998L7.18001 11.5298L6.47001 10.8198Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
