import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconEmojiObjects } from '@aws-amplify/ui-react';` → `import { MdEmojiObjects } from 'react-icons/md';`
 */
export const IconEmojiObjects = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconEmojiObjects } from '@aws-amplify/ui-react'; → import { MdEmojiObjects } from 'react-icons/md';`,
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
          d="M11.9998 3C11.5398 3 11.0698 3.04 10.5998 3.14C7.83983 3.67 5.63983 5.9 5.11983 8.66C4.63983 11.27 5.59983 13.67 7.33983 15.22C7.76983 15.6 7.99983 16.13 7.99983 16.69V19C7.99983 20.1 8.89983 21 9.99983 21H10.2798C10.6298 21.6 11.2598 22 11.9998 22C12.7398 22 13.3798 21.6 13.7198 21H13.9998C15.0998 21 15.9998 20.1 15.9998 19V16.69C15.9998 16.14 16.2198 15.6 16.6398 15.23C18.0898 13.95 18.9998 12.08 18.9998 10C18.9998 6.13 15.8698 3 11.9998 3ZM13.9998 17H9.99983V16H13.9998V17ZM9.99983 19V18H13.9998V19H9.99983ZM15.3098 13.74C15.2198 13.82 15.1498 13.92 15.0698 14H8.91983C8.83983 13.91 8.76983 13.81 8.67983 13.73C7.35983 12.55 6.76983 10.79 7.08983 9.03C7.44983 7.09 9.04983 5.48 10.9798 5.1C11.3198 5.03 11.6598 5 11.9998 5C14.7598 5 16.9998 7.24 16.9998 10C16.9998 11.43 16.3898 12.79 15.3098 13.74Z"
          fill="currentColor"
        />
        <path d="M12.5 11H11.5V14H12.5V11Z" fill="black" />
        <path
          d="M10.3795 8.87371L9.67236 9.58081L11.7937 11.7021L12.5008 10.995L10.3795 8.87371Z"
          fill="black"
        />
        <path
          d="M11.5009 11.0053L12.208 11.7124L14.3293 9.5911L13.6222 8.884L11.5009 11.0053Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
