import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconNoBackpack } from '@aws-amplify/ui-react';` → `import { MdNoBackpack } from 'react-icons/md';`
 */
export const IconNoBackpack = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconNoBackpack');
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
          d="M6.98014 4.15C6.99014 4.15 6.99014 4.14 7.00014 4.14V2H10.0001V4H14.0001V2H17.0001V4.14C18.7201 4.59 20.0001 6.14 20.0001 8V17.17L18.0001 15.17V8C18.0001 6.9 17.1001 6 16.0001 6H8.83014L6.98014 4.15ZM14.8301 12L16.5001 13.67V12H14.8301ZM19.7801 22.61L18.9301 21.76C18.6501 21.91 18.3401 22 18.0001 22H6.00014C4.90014 22 4.00014 21.1 4.00014 20V8C4.00014 7.64 4.06014 7.31 4.15014 6.98L1.39014 4.22L2.80014 2.81L21.1801 21.19L19.7801 22.61ZM17.1701 20L11.1701 14H7.50014V12H9.17014L6.00014 8.83V20H17.1701Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
