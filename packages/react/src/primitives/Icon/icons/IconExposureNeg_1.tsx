import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconExposureNeg_1 } from '@aws-amplify/ui-react';` → `import { MdExposureNeg_1 } from 'react-icons/md';`
 */
export const IconExposureNeg_1 = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconExposureNeg_1 } from '@aws-amplify/ui-react'; → import { MdExposureNeg_1 } from 'react-icons/md';`,
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
          d="M4 11V13H12V11H4ZM19 18H17V7.38L14 8.4V6.7L18.7 5H19V18Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
