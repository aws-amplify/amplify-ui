import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconBatchPrediction } from '@aws-amplify/ui-react';` → `import { MdBatchPrediction } from 'react-icons/md';`
 */
export const IconBatchPrediction = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconBatchPrediction } from '@aws-amplify/ui-react'; → import { MdBatchPrediction } from 'react-icons/md';`,
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
          d="M17 8H7C5.9 8 5 8.9 5 10V20C5 21.1 5.9 22 7 22H17C18.1 22 19 21.1 19 20V10C19 8.9 18.1 8 17 8ZM13 20.5H11V19H13V20.5ZM13 18H11C11 16.5 8.5 15 8.5 13C8.5 11.07 10.07 9.5 12 9.5C13.93 9.5 15.5 11.07 15.5 13C15.5 15 13 16.5 13 18ZM18 6.5H6C6 5.67 6.67 5 7.5 5H16.5C17.33 5 18 5.67 18 6.5ZM17 3.5H7C7 2.67 7.67 2 8.5 2H15.5C16.33 2 17 2.67 17 3.5Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
