import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconGridOff = (props) => {
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
        <g clip-path="url(#clip0_1020_40416)">
          <path
            d="M8 4.00014V4.89014L10 6.89014V4.00014H14V8.00014H11.11L13.11 10.0001H14V10.8901L16 12.8901V10.0001H20V14.0001H17.11L19.11 16.0001H20V16.8901L22 18.8901V4.00014C22 2.90014 21.1 2.00014 20 2.00014H5.11L7.11 4.00014H8ZM16 4.00014H20V8.00014H16V4.00014ZM1.41 1.14014L0 2.55014L2 4.55014V20.0001C2 21.1001 2.9 22.0001 4 22.0001H19.45L21.46 24.0101L22.87 22.6001L1.41 1.14014ZM10 12.5501L11.45 14.0001H10V12.5501ZM4 6.55014L5.45 8.00014H4V6.55014V6.55014ZM8 20.0001H4V16.0001H8V20.0001ZM8 14.0001H4V10.0001H7.45L8 10.5501V14.0001ZM14 20.0001H10V16.0001H13.45L14 16.5501V20.0001ZM16 20.0001V18.5501L17.45 20.0001H16Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_1020_40416">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </View>
  );
};
