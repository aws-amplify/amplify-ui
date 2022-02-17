import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconMusicOff } from '@aws-amplify/ui-react';` → `import { MdMusicOff } from 'react-icons/md';`
 */
export const IconMusicOff = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconMusicOff');
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
          d="M14 6.99986H18V2.99986H12V7.60986L14 9.60986V6.99986ZM12 10.4399L4.41 2.85986L3 4.26986L12 13.2699V13.5499C11.06 13.0099 9.9 12.7999 8.67 13.2299C7.33 13.7099 6.3 14.8999 6.06 16.2999C5.6 19.0399 7.92 21.3799 10.65 20.9499C12.61 20.6399 14 18.8399 14 16.8499V15.2699L19.73 20.9999L21.14 19.5899L12 10.4399ZM10 18.9999C8.9 18.9999 8 18.0999 8 16.9999C8 15.8999 8.9 14.9999 10 14.9999C11.1 14.9999 12 15.8999 12 16.9999C12 18.0999 11.1 18.9999 10 18.9999Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
