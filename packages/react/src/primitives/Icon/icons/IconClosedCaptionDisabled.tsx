import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconClosedCaptionDisabled } from '@aws-amplify/ui-react';` → `import { MdClosedCaptionDisabled } from 'react-icons/md';`
 */
export const IconClosedCaptionDisabled = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconClosedCaptionDisabled } from '@aws-amplify/ui-react'; → import { MdClosedCaptionDisabled } from 'react-icons/md';`,
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
          d="M13 10.0001C13 9.45006 13.45 9.00006 14 9.00006H17C17.55 9.00006 18 9.45006 18 10.0001V11.0001H16.5V10.5001H14.5V11.5001L13 10.0001ZM16.5 13.5001L17.71 14.7101C17.89 14.5201 18 14.2701 18 14.0001V13.0001H16.5V13.5001ZM8.83001 6.00006H19V16.1701L20.98 18.1501C20.98 18.1001 21 18.0501 21 17.9901V6.00006C21 4.90006 20.1 4.00006 19 4.00006H6.83001L8.83001 6.00006ZM19.78 22.6101L17.17 20.0001H5.00001C3.89001 20.0001 3.00001 19.1001 3.00001 18.0001V6.00006C3.00001 5.95006 3.02001 5.90006 3.02001 5.85006L1.39001 4.22006L2.80001 2.81006L21.18 21.1901L19.78 22.6101ZM7.50001 13.5001H9.50001V13.0001H10.17L7.67001 10.5001H7.50001V13.5001ZM15.17 18.0001L11 13.8301V14.0001C11 14.5501 10.55 15.0001 10 15.0001H7.00001C6.45001 15.0001 6.00001 14.5501 6.00001 14.0001V10.0001C6.00001 9.68006 6.16001 9.41006 6.40001 9.22006L5.00001 7.83006V18.0001H15.17Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
