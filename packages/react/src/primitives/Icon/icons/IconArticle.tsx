import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconArticle } from '@aws-amplify/ui-react';` → `import { MdArticle } from 'react-icons/md';`
 */
export const IconArticle = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconArticle');
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
          d="M19 5V19H5V5H19ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z"
          fill="currentColor"
        />
        <path
          d="M14 17H7V15H14V17ZM17 13H7V11H17V13ZM17 9H7V7H17V9Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
