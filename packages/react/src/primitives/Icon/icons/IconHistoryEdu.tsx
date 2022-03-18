import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconHistoryEdu } from '@aws-amplify/ui-react';` → `import { MdHistoryEdu } from 'react-icons/md';`
 */
export const IconHistoryEdu = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconHistoryEdu } from '@aws-amplify/ui-react'; → import { MdHistoryEdu } from 'react-icons/md';`,
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
          d="M8.99994 4V5.38C8.16994 5.05 7.27994 4.88 6.38994 4.88C4.59994 4.88 2.80994 5.56 1.43994 6.93L4.76994 10.26H5.87994V11.37C6.73994 12.23 7.85994 12.68 8.98994 12.73V15H5.99994V18C5.99994 19.1 6.89994 20 7.99994 20H17.9999C19.6599 20 20.9999 18.66 20.9999 17V4H8.99994ZM7.88994 10.41V8.26H5.60994L4.56994 7.22C5.13994 7 5.75994 6.88 6.38994 6.88C7.72994 6.88 8.97994 7.4 9.92994 8.34L11.3399 9.75L11.1399 9.95C10.6299 10.46 9.94994 10.75 9.21994 10.75C8.74994 10.75 8.28994 10.63 7.88994 10.41ZM18.9999 17C18.9999 17.55 18.5499 18 17.9999 18C17.4499 18 16.9999 17.55 16.9999 17V15H10.9999V12.41C11.5699 12.18 12.0999 11.84 12.5599 11.38L12.7599 11.18L15.5899 14H16.9999V12.59L10.9999 6.62V6H18.9999V17Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
