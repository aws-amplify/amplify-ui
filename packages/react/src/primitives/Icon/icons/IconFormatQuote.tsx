import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconFormatQuote } from '@aws-amplify/ui-react';` → `import { MdFormatQuote } from 'react-icons/md';`
 */
export const IconFormatQuote = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconFormatQuote');
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
          d="M18.62 18H13.38L15.38 14H13V6H21V13.24L18.62 18ZM16.62 16H17.38L19 12.76V8H15V12H18.62L16.62 16ZM8.62 18H3.38L5.38 14H3V6H11V13.24L8.62 18V18ZM6.62 16H7.38L9 12.76V8H5V12H8.62L6.62 16Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
