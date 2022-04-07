import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconDoNotTouch } from '@aws-amplify/ui-react';` → `import { MdDoNotTouch } from 'react-icons/md';`
 */
export const IconDoNotTouch = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconDoNotTouch } from '@aws-amplify/ui-react'; → import { MdDoNotTouch } from 'react-icons/md';`,
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
          d="M2.81014 2.81L1.39014 4.22L7.00014 9.83V14.13L4.40014 12.65C4.23014 12.56 4.06014 12.51 3.86014 12.51C3.60014 12.51 3.36014 12.6 3.16014 12.77L2.00014 13.88L8.80014 21.06C9.37014 21.66 10.1501 22 10.9801 22H17.0001C17.6201 22 18.1801 21.81 18.6601 21.48L19.7801 22.6L21.1901 21.19L2.81014 2.81ZM17.0001 20H11.0001C10.6101 20 10.3601 19.77 10.2501 19.64L6.87014 16H9.00014V11.83L17.1401 19.97C17.0901 19.98 17.0501 20 17.0001 20ZM13.8301 11H14.0001V3.25C14.0001 2.56 14.5601 2 15.2501 2C15.9401 2 16.5001 2.56 16.5001 3.25V11H17.5001V5.25C17.5001 4.56 18.0601 4 18.7501 4C19.4401 4 20.0001 4.56 20.0001 5.25V17.17L18.0001 15.17V13H15.8301L13.8301 11ZM13.0001 10.17V2.25C13.0001 1.56 12.4401 1 11.7501 1C11.0601 1 10.5001 1.56 10.5001 2.25V7.67L13.0001 10.17ZM9.50014 6.67V4.25C9.50014 3.56 8.94014 3 8.25014 3C7.58014 3 7.05014 3.53 7.01014 4.18L9.50014 6.67Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
