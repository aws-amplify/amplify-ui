import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconArrowBackIos } from '@aws-amplify/ui-react';` → `import { MdArrowBackIos } from 'react-icons/md';`
 */
export const IconArrowBackIos = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconArrowBackIos } from '@aws-amplify/ui-react'; → import { MdArrowBackIos } from 'react-icons/md';`,
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
          d="M17.5098 3.8701L15.7298 2.1001L5.83984 12.0001L15.7398 21.9001L17.5098 20.1301L9.37984 12.0001L17.5098 3.8701V3.8701Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
