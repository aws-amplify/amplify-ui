import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconBrightness_4 } from '@aws-amplify/ui-react';` → `import { MdBrightness_4 } from 'react-icons/md';`
 */
export const IconBrightness_4 = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconBrightness_4');
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
          d="M19.9999 8.68994V3.99994H15.3099L11.9999 0.689941L8.68994 3.99994H3.99994V8.68994L0.689941 11.9999L3.99994 15.3099V19.9999H8.68994L11.9999 23.3099L15.3099 19.9999H19.9999V15.3099L23.3099 11.9999L19.9999 8.68994ZM17.9999 14.4799V17.9999H14.4799L11.9999 20.4799L9.51994 17.9999H5.99994V14.4799L3.51994 11.9999L5.99994 9.51994V5.99994H9.51994L11.9999 3.51994L14.4799 5.99994H17.9999V9.51994L20.4799 11.9999L17.9999 14.4799ZM12.2899 6.99994C11.5499 6.99994 10.8399 7.16994 10.2099 7.45994C11.9299 8.24994 13.1299 9.98994 13.1299 11.9999C13.1299 14.0099 11.9299 15.7499 10.2099 16.5399C10.8399 16.8299 11.5499 16.9999 12.2899 16.9999C15.0499 16.9999 17.2899 14.7599 17.2899 11.9999C17.2899 9.23994 15.0499 6.99994 12.2899 6.99994Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
