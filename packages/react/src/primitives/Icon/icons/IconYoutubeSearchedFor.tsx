import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconYoutubeSearchedFor = (props) => {
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
          d="M17.01 14H16.21L15.94 13.73C16.92 12.59 17.51 11.12 17.51 9.5C17.51 5.91 14.6 3 11.01 3C7.42 3 4.51 6 4.51 9.5H2L5.84 13.5L10 9.5H6.51C6.51 7 8.53 5 11.01 5C13.49 5 15.51 7.01 15.51 9.5C15.51 11.98 13.49 14 11.01 14C10.36 14 9.75 13.86 9.19 13.62L7.71 15.1C8.68 15.67 9.8 16 11.01 16C12.62 16 14.09 15.41 15.23 14.43L15.5 14.7V15.49L20.51 20.48L22 19L17.01 14V14Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
