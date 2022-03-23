import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconNoStroller } from '@aws-amplify/ui-react';` → `import { MdNoStroller } from 'react-icons/md';`
 */
export const IconNoStroller = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconNoStroller } from '@aws-amplify/ui-react'; → import { MdNoStroller } from 'react-icons/md';`,
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
          d="M8.00014 20.0001C8.00014 21.1001 7.10014 22.0001 6.00014 22.0001C4.90014 22.0001 4.00014 21.1001 4.00014 20.0001C4.00014 18.9001 4.90014 18.0001 6.00014 18.0001C7.10014 18.0001 8.00014 18.9001 8.00014 20.0001ZM15.0001 8.66006V12.1701L17.0001 14.1701V6.27006C17.5801 5.59006 17.9701 5.00006 18.6501 5.00006C19.4201 5.00006 20.0001 5.66006 20.0001 6.48006V7.00006H22.0001V6.48006C22.0001 4.56006 20.5201 3.00006 18.6501 3.00006C16.9901 3.00006 16.1101 4.27006 15.4701 5.03006L11.9701 9.14006L13.3901 10.5601L15.0001 8.66006ZM19.7801 22.6101L17.8701 20.7001C17.5801 21.4601 16.8601 22.0001 16.0001 22.0001C14.9001 22.0001 14.0001 21.1001 14.0001 20.0001C14.0001 19.1401 14.5401 18.4201 15.3001 18.1301L14.1701 17.0001H7.43014C6.58014 17.0001 6.12014 16.0001 6.67014 15.3501L9.36014 12.1901L1.39014 4.22006L2.80014 2.81006L10.6601 10.6701L12.0801 12.0901L21.1901 21.2001L19.7801 22.6101ZM12.1701 15.0001L10.7801 13.6101L9.60014 15.0001H12.1701ZM10.0001 5.00006C10.2901 5.00006 10.5801 5.02006 10.8601 5.05006L9.49014 6.67006L10.9101 8.09006L14.3001 4.10006C13.0301 3.40006 11.5601 3.00006 10.0001 3.00006C8.77014 3.00006 7.60014 3.25006 6.53014 3.70006L8.10014 5.27006C8.71014 5.10006 9.35014 5.00006 10.0001 5.00006Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
