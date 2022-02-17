import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconExposureZero } from '@aws-amplify/ui-react';` → `import { MdExposureZero } from 'react-icons/md';`
 */
export const IconExposureZero = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconExposureZero');
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
          d="M16.1401 12.5C16.1401 13.5 16.0401 14.35 15.8401 15.05C15.6401 15.75 15.3601 16.32 15.0101 16.75C14.6501 17.19 14.2201 17.5 13.7101 17.7C13.2001 17.9 12.6401 18 12.0101 18C11.3901 18 10.8301 17.9 10.3201 17.7C9.81011 17.5 9.37011 17.19 9.01011 16.75C8.65011 16.31 8.36011 15.74 8.16011 15.05C7.96011 14.35 7.86011 13.5 7.86011 12.5V10.46C7.86011 9.46 7.96011 8.61 8.16011 7.91C8.36011 7.21 8.64011 6.65 9.00011 6.22C9.36011 5.79 9.80011 5.48 10.3101 5.29C10.8101 5.1 11.3801 5 12.0001 5C12.6301 5 13.1901 5.1 13.7001 5.29C14.2101 5.48 14.6501 5.79 15.0101 6.22C15.3701 6.65 15.6501 7.21 15.8501 7.91C16.0501 8.61 16.1501 9.45 16.1501 10.46V12.5H16.1401V12.5ZM14.0301 10.14C14.0301 9.5 13.9801 8.96 13.9001 8.52C13.8101 8.08 13.6801 7.73 13.5001 7.46C13.3301 7.19 13.1101 7 12.8601 6.88C12.6101 6.75 12.3201 6.69 12.0001 6.69C11.6801 6.69 11.3901 6.75 11.1401 6.87C10.8901 6.99 10.6701 7.18 10.5001 7.45C10.3301 7.72 10.1901 8.07 10.1001 8.51C10.0101 8.95 9.97011 9.49 9.97011 10.13V12.8C9.97011 13.44 10.0201 13.98 10.1101 14.42C10.2001 14.87 10.3401 15.23 10.5101 15.51C10.6801 15.79 10.9001 15.99 11.1501 16.12C11.4001 16.25 11.6901 16.31 12.0201 16.31C12.3501 16.31 12.6401 16.25 12.8901 16.12C13.1401 15.99 13.3501 15.79 13.5201 15.51C13.6901 15.23 13.8201 14.87 13.9101 14.42C14.0001 13.97 14.0401 13.43 14.0401 12.8V10.14H14.0301V10.14Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
