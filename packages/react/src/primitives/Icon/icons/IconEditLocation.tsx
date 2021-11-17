import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconEditLocation = (props) => {
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
          d="M18.17 4.91019L17.1 3.84019L11.55 9.39019V10.4702H12.63L18.17 4.91019V4.91019ZM16 2.74019L17.29 1.45019C17.4286 1.3099 17.5936 1.19851 17.7756 1.12249C17.9576 1.04647 18.1528 1.00732 18.35 1.00732C18.5472 1.00732 18.7424 1.04647 18.9244 1.12249C19.1064 1.19851 19.2714 1.3099 19.41 1.45019L20.56 2.60019C21.15 3.19019 21.15 4.14019 20.56 4.72019L19.88 5.40019L19.86 5.42019L19.28 6.00019L13.28 12.0002H10V8.74018L16 2.74019ZM13.72 2.19019L13.17 2.74019L11.9 4.01019C8.6 4.06019 6 6.61019 6 10.2102C6 12.5502 7.95 15.6502 12 19.3502C16.05 15.6502 18 12.5602 18 10.2102V10.1102L19.8 8.31019C19.93 8.91019 20 9.55019 20 10.2102C20 13.5302 17.33 17.4602 12 22.0102C6.67 17.4602 4 13.5302 4 10.2102C4 5.23019 7.8 2.01019 12 2.01019C12.58 2.01019 13.16 2.07019 13.72 2.19019V2.19019Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
