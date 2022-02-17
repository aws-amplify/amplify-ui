import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSignalCellular_4Bar } from '@aws-amplify/ui-react';` → `import { MdSignalCellular_4Bar } from 'react-icons/md';`
 */
export const IconSignalCellular_4Bar = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconSignalCellular_4Bar');
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
        <path d="M2 22H22V2L2 22Z" fill="currentColor" />
      </svg>
    </View>
  );
};
