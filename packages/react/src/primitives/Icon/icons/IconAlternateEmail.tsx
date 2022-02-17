import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconAlternateEmail } from '@aws-amplify/ui-react';` → `import { MdAlternateEmail } from 'react-icons/md';`
 */
export const IconAlternateEmail = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconAlternateEmail');
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
          d="M12 1.9502C6.48 1.9502 2 6.4302 2 11.9502C2 17.4702 6.48 21.9502 12 21.9502H17V19.9502H12C7.66 19.9502 4 16.2902 4 11.9502C4 7.6102 7.66 3.9502 12 3.9502C16.34 3.9502 20 7.6102 20 11.9502V13.3802C20 14.1702 19.29 14.9502 18.5 14.9502C17.71 14.9502 17 14.1702 17 13.3802V11.9502C17 9.1902 14.76 6.9502 12 6.9502C9.24 6.9502 7 9.1902 7 11.9502C7 14.7102 9.24 16.9502 12 16.9502C13.38 16.9502 14.64 16.3902 15.54 15.4802C16.19 16.3702 17.31 16.9502 18.5 16.9502C20.47 16.9502 22 15.3502 22 13.3802V11.9502C22 6.4302 17.52 1.9502 12 1.9502V1.9502ZM12 14.9502C10.34 14.9502 9 13.6102 9 11.9502C9 10.2902 10.34 8.9502 12 8.9502C13.66 8.9502 15 10.2902 15 11.9502C15 13.6102 13.66 14.9502 12 14.9502Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
