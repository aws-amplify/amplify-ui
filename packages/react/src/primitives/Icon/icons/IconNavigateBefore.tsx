import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconNavigateBefore } from '@aws-amplify/ui-react';` → `import { MdNavigateBefore } from 'react-icons/md';`
 */
export const IconNavigateBefore = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconNavigateBefore');
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
          d="M15.61 7.41L14.2 6L8.19995 12L14.2 18L15.61 16.59L11.03 12L15.61 7.41Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
