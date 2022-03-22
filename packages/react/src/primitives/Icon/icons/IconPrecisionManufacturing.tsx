import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconPrecisionManufacturing } from '@aws-amplify/ui-react';` → `import { MdPrecisionManufacturing } from 'react-icons/md';`
 */
export const IconPrecisionManufacturing = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconPrecisionManufacturing } from '@aws-amplify/ui-react'; → import { MdPrecisionManufacturing } from 'react-icons/md';`,
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
          d="M19.93 8.34994L16.33 10.0299L14 7.69994V6.29994L16.33 3.96994L19.93 5.64994C20.31 5.82994 20.75 5.65994 20.93 5.28994C21.11 4.90994 20.94 4.46994 20.57 4.28994L16.65 2.45994C16.27 2.27994 15.82 2.35994 15.52 2.65994L13.78 4.39994C13.6 4.15994 13.32 3.99994 13 3.99994C12.45 3.99994 12 4.44994 12 4.99994V5.99994H8.82C8.4 4.83994 7.3 3.99994 6 3.99994C4.34 3.99994 3 5.33994 3 6.99994C3 8.09994 3.6 9.04994 4.48 9.57994L7.08 17.9999H6C4.9 17.9999 4 18.8999 4 19.9999V20.9999H17V19.9999C17 18.8999 16.1 17.9999 15 17.9999H13.38L8.41 8.76994C8.58 8.52994 8.72 8.27994 8.82 7.99994H12V8.99994C12 9.54994 12.45 9.99994 13 9.99994C13.32 9.99994 13.6 9.83994 13.78 9.59994L15.52 11.3399C15.82 11.6399 16.27 11.7199 16.65 11.5399L20.57 9.70994C20.95 9.52994 21.11 9.08994 20.93 8.70994C20.75 8.33994 20.31 8.16994 19.93 8.34994ZM6 7.99994C5.45 7.99994 5 7.54994 5 6.99994C5 6.44994 5.45 5.99994 6 5.99994C6.55 5.99994 7 6.44994 7 6.99994C7 7.54994 6.55 7.99994 6 7.99994ZM11.11 17.9999H9.17L6.71 9.99994H6.81L11.11 17.9999Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
