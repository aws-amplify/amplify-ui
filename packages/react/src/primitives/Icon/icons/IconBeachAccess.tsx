import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconBeachAccess = (props) => {
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
          d="M20.9998 19.57L19.5728 20.998L13.1308 14.556L14.5608 13.128L20.9998 19.57ZM13.1198 3C10.5398 3 7.95982 3.98 5.97982 5.95L5.96982 5.96C2.01982 9.91 2.01982 16.32 5.96982 20.27L20.2698 5.96C18.2998 3.99 15.7098 3 13.1198 3ZM6.13982 17.27C5.39982 16.03 4.99982 14.61 4.99982 13.12C4.99982 12.19 5.15982 11.3 5.45982 10.45C5.64982 12.36 6.34982 14.24 7.52982 15.89L6.13982 17.27ZM8.97982 14.43C7.62982 12.38 7.11982 9.93 7.59982 7.6C8.17982 7.48 8.75982 7.42 9.34982 7.42C11.1498 7.42 12.8998 7.97 14.4298 8.98L8.97982 14.43ZM10.4498 5.46C11.2998 5.16 12.1898 5 13.1198 5C14.6098 5 16.0298 5.4 17.2698 6.14L15.8798 7.53C14.2298 6.35 12.3598 5.65 10.4498 5.46V5.46Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
