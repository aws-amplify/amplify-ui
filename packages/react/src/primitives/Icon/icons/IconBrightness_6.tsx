import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconBrightness_6 } from '@aws-amplify/ui-react';` → `import { MdBrightness_6 } from 'react-icons/md';`
 */
export const IconBrightness_6 = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconBrightness_6');
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
          d="M19.9999 8.68994V3.99994H15.3099L11.9999 0.689941L8.68994 3.99994H3.99994V8.68994L0.689941 11.9999L3.99994 15.3099V19.9999H8.68994L11.9999 23.3099L15.3099 19.9999H19.9999V15.3099L23.3099 11.9999L19.9999 8.68994ZM17.9999 14.4799V17.9999H14.4799L11.9999 20.4799L9.51994 17.9999H5.99994V14.4799L3.51994 11.9999L5.99994 9.51994V5.99994H9.51994L11.9999 3.51994L14.4799 5.99994H17.9999V9.51994L20.4799 11.9999L17.9999 14.4799ZM11.9999 6.49994V17.4999C15.0299 17.4999 17.4999 15.0299 17.4999 11.9999C17.4999 8.96994 15.0299 6.49994 11.9999 6.49994Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
