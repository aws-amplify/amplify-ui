import { Icon } from '@aws-amplify/ui-react';

export const AmplifyIcon = ({ ariaLabel = '', ...rest }) => (
  <Icon
    ariaLabel={ariaLabel}
    {...rest}
    paths={[
      {
        d: 'M5.22274 17.8571H11.9827L13.7143 20.9048H13.6655H0L4.8154 12.5604L6.83337 9.06616L8.56591 12.0683L5.22274 17.8571ZM7.74389 7.48595L9.40738 4.60353L18.8218 20.9047H15.4878L7.74389 7.48595ZM10.3333 3H13.6628L24 20.9048H20.6662L10.3333 3Z',
        fillRule: 'evenodd',
      },
    ]}
  />
);
