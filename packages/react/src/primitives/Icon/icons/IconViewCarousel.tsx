import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconViewCarousel } from '@aws-amplify/ui-react';` → `import { MdViewCarousel } from 'react-icons/md';`
 */
export const IconViewCarousel = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconViewCarousel');
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
          d="M2 6H6V17H2V6ZM7 19H17V4H7V19ZM9 6H15V17H9V6ZM18 6H22V17H18V6Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
