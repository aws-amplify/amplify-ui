import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconBubbleChart } from '@aws-amplify/ui-react';` → `import { MdBubbleChart } from 'react-icons/md';`
 */
export const IconBubbleChart = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconBubbleChart');
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
          d="M7 10C4.79 10 3 11.79 3 14C3 16.21 4.79 18 7 18C9.21 18 11 16.21 11 14C11 11.79 9.21 10 7 10ZM7 16C5.9 16 5 15.1 5 14C5 12.9 5.9 12 7 12C8.1 12 9 12.9 9 14C9 15.1 8.1 16 7 16ZM15.01 15C13.36 15 12.01 16.35 12.01 18C12.01 19.65 13.36 21 15.01 21C16.66 21 18.01 19.65 18.01 18C18.01 16.35 16.66 15 15.01 15V15ZM15.01 19C14.46 19 14.01 18.55 14.01 18C14.01 17.45 14.46 17 15.01 17C15.56 17 16.01 17.45 16.01 18C16.01 18.55 15.56 19 15.01 19V19ZM16.5 3C13.47 3 11 5.47 11 8.5C11 11.53 13.47 14 16.5 14C19.53 14 22 11.53 22 8.5C22 5.47 19.53 3 16.5 3ZM16.5 12C14.57 12 13 10.43 13 8.5C13 6.57 14.57 5 16.5 5C18.43 5 20 6.57 20 8.5C20 10.43 18.43 12 16.5 12Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
