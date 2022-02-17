import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconRemoveShoppingCart } from '@aws-amplify/ui-react';` → `import { MdRemoveShoppingCart } from 'react-icons/md';`
 */
export const IconRemoveShoppingCart = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconRemoveShoppingCart');
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
        <g clip-path="url(#clip0_1020_38169)">
          <path
            d="M1.41 1.12988L0 2.53988L4.39 6.92988L6.6 11.5899L5.25 14.0399C5.09 14.3199 5 14.6499 5 14.9999C5 16.0999 5.9 16.9999 7 16.9999H14.46L15.84 18.3799C15.34 18.7399 15.01 19.3299 15.01 19.9999C15.01 21.0999 15.9 21.9999 17 21.9999C17.67 21.9999 18.26 21.6699 18.62 21.1599L21.46 23.9999L22.87 22.5899L1.41 1.12988ZM7 14.9999L8.1 12.9999H10.46L12.46 14.9999H7ZM20 3.99988H7.12L9.12 5.99988H18.31L15.55 10.9999H14.11L16.05 12.9399C16.59 12.7999 17.04 12.4499 17.3 11.9699L20.88 5.47988C21.25 4.81988 20.76 3.99988 20 3.99988ZM7 17.9999C5.9 17.9999 5.01 18.8999 5.01 19.9999C5.01 21.0999 5.9 21.9999 7 21.9999C8.1 21.9999 9 21.0999 9 19.9999C9 18.8999 8.1 17.9999 7 17.9999Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_1020_38169">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </View>
  );
};
