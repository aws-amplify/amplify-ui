import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSnooze } from '@aws-amplify/ui-react';` → `import { MdSnooze } from 'react-icons/md';`
 */
export const IconSnooze = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconSnooze } from '@aws-amplify/ui-react'; → import { MdSnooze } from 'react-icons/md';`,
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
          d="M9.00003 11.0001H12.63L9.00003 15.2001V17.0001H15V15.0001H11.37L15 10.8001V9.00006H9.00003V11.0001ZM16.056 3.34606L17.338 1.81106L21.945 5.66106L20.665 7.20106L16.056 3.34606ZM3.33603 7.19006L2.05603 5.65406L6.66203 1.81006L7.94203 3.34606L3.33603 7.19006ZM12 6.00006C15.86 6.00006 19 9.14006 19 13.0001C19 16.8601 15.86 20.0001 12 20.0001C8.14003 20.0001 5.00003 16.8601 5.00003 13.0001C5.00003 9.14006 8.14003 6.00006 12 6.00006ZM12 4.00006C7.03003 4.00006 3.00003 8.03006 3.00003 13.0001C3.00003 17.9701 7.03003 22.0001 12 22.0001C16.97 22.0001 21 17.9701 21 13.0001C21 8.03006 16.97 4.00006 12 4.00006Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
