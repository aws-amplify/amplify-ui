import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconHowToVote } from '@aws-amplify/ui-react';` → `import { MdHowToVote } from 'react-icons/md';`
 */
export const IconHowToVote = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconHowToVote');
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
          d="M18 12.9998H17.32L15.32 14.9998H17.23L19 16.9998H5L6.78 14.9998H8.83L6.83 12.9998H6L3 15.9998V19.9998C3 21.0998 3.89 21.9998 4.99 21.9998H19C20.1 21.9998 21 21.1098 21 19.9998V15.9998L18 12.9998ZM19 19.9998H5V18.9998H19V19.9998ZM11.34 15.0198C11.73 15.4098 12.36 15.4098 12.75 15.0198L19.11 8.6598C19.5 8.2698 19.5 7.6398 19.11 7.2498L14.16 2.2998C13.78 1.8998 13.15 1.8998 12.76 2.2898L6.39 8.6598C6 9.0498 6 9.6798 6.39 10.0698L11.34 15.0198ZM13.46 4.4098L17 7.9498L12.05 12.8998L8.51 9.3598L13.46 4.4098V4.4098Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
