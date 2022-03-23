import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconRotate_90DegreesCcw } from '@aws-amplify/ui-react';` → `import { MdRotate_90DegreesCcw } from 'react-icons/md';`
 */
export const IconRotate_90DegreesCcw = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconRotate_90DegreesCcw } from '@aws-amplify/ui-react'; → import { MdRotate_90DegreesCcw } from 'react-icons/md';`,
  });
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
          d="M7.34011 6.40977L0.860107 12.8998L7.35011 19.3798L13.8401 12.8998L7.34011 6.40977V6.40977ZM3.69011 12.8998L7.35011 9.23977L11.0001 12.8998L7.34011 16.5598L3.69011 12.8998V12.8998ZM19.3601 6.63977C17.6101 4.87977 15.3001 3.99977 13.0001 3.99977V0.759766L8.76011 4.99977L13.0001 9.23977V5.99977C14.7901 5.99977 16.5801 6.67977 17.9501 8.04977C20.6801 10.7798 20.6801 15.2198 17.9501 17.9498C16.5801 19.3198 14.7901 19.9998 13.0001 19.9998C12.0301 19.9998 11.0601 19.7898 10.1601 19.3898L8.67011 20.8798C10.0201 21.6198 11.5101 21.9998 13.0001 21.9998C15.3001 21.9998 17.6101 21.1198 19.3601 19.3598C22.8801 15.8498 22.8801 10.1498 19.3601 6.63977V6.63977Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
