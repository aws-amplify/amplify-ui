import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconTimelapse } from '@aws-amplify/ui-react';` → `import { MdTimelapse } from 'react-icons/md';`
 */
export const IconTimelapse = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconTimelapse');
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
          d="M16.24 7.75023C15.07 6.58023 13.54 5.99023 12 5.99023V11.9902L7.76 16.2302C10.1 18.5702 13.9 18.5702 16.25 16.2302C18.59 13.8902 18.59 10.0902 16.24 7.75023ZM12 1.99023C6.48 1.99023 2 6.47023 2 11.9902C2 17.5102 6.48 21.9902 12 21.9902C17.52 21.9902 22 17.5102 22 11.9902C22 6.47023 17.52 1.99023 12 1.99023V1.99023ZM12 19.9902C7.58 19.9902 4 16.4102 4 11.9902C4 7.57023 7.58 3.99023 12 3.99023C16.42 3.99023 20 7.57023 20 11.9902C20 16.4102 16.42 19.9902 12 19.9902Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
