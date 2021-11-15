import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconNoFlash = (props) => {
  const { className, ...rest } = props;
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
          d="M20.3999 5.6H21.9999L18.9999 11V7H17.9999V2H21.9999L20.3999 5.6ZM15.9999 11.4V13.17L17.9999 15.17V11C17.9999 10.12 17.2799 9.4 16.3999 9.4H13.8599L12.5799 8H10.8299L14.2299 11.4H15.9999ZM2.09994 2.1L0.689941 3.51L6.34994 9.17L6.13994 9.4H3.59994C2.71994 9.4 1.99994 10.12 1.99994 11V20.4C1.99994 21.28 2.71994 22 3.59994 22H16.3999C17.1499 22 17.7799 21.48 17.9499 20.78L20.4899 23.32L21.8999 21.91L2.09994 2.1ZM11.4999 15.5C11.4999 16.33 10.8299 17 9.99994 17C9.16994 17 8.49994 16.33 8.49994 15.5C8.49994 14.67 9.16994 14 9.99994 14C10.8299 14 11.4999 14.67 11.4999 15.5ZM15.9599 20H3.99994V11.4H6.13994H7.01994L7.60994 10.75L7.75994 10.59L9.25994 12.09C7.67994 12.43 6.49994 13.82 6.49994 15.5C6.49994 17.43 8.06994 19 9.99994 19C11.6799 19 13.0699 17.82 13.4199 16.24L15.9699 18.79L15.9599 20Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
