import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconOnlinePrediction } from '@aws-amplify/ui-react';` → `import { MdOnlinePrediction } from 'react-icons/md';`
 */
export const IconOnlinePrediction = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconOnlinePrediction } from '@aws-amplify/ui-react'; → import { MdOnlinePrediction } from 'react-icons/md';`,
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
          d="M15.5 11.5002C15.5 13.5002 13 15.0002 13 16.5002H11C11 15.0002 8.5 13.5002 8.5 11.5002C8.5 9.57018 10.07 8.00018 12 8.00018C13.93 8.00018 15.5 9.57018 15.5 11.5002ZM13 17.5002H11V19.0002H13V17.5002ZM22 12.0002C22 9.24018 20.88 6.74018 19.07 4.93018L18.01 5.99018C19.55 7.53018 20.5 9.66018 20.5 12.0002C20.5 14.3402 19.55 16.4702 18.01 18.0102L19.07 19.0702C20.88 17.2602 22 14.7602 22 12.0002ZM3.5 12.0002C3.5 9.66018 4.45 7.53018 5.99 5.99018L4.93 4.93018C3.12 6.74018 2 9.24018 2 12.0002C2 14.7602 3.12 17.2602 4.93 19.0702L5.99 18.0102C4.45 16.4702 3.5 14.3402 3.5 12.0002ZM17.5 12.0002C17.5 13.5202 16.88 14.8902 15.89 15.8902L16.95 16.9502C18.22 15.6802 19 13.9302 19 12.0002C19 10.0702 18.22 8.32018 16.95 7.05018L15.89 8.11018C16.88 9.11018 17.5 10.4802 17.5 12.0002ZM7.05 16.9502L8.11 15.8902C7.11 14.8902 6.5 13.5202 6.5 12.0002C6.5 10.4802 7.12 9.11018 8.11 8.11018L7.05 7.05018C5.78 8.32018 5 10.0702 5 12.0002C5 13.9302 5.78 15.6802 7.05 16.9502Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
