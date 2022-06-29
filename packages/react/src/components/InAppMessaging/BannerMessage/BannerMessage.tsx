import { useMessageProps } from '../hooks';
import { MessageLayout } from '../MessageLayout';

import { getStyles } from './styles';
// import { BannerMessageProps } from './types';

export default function BannerMessage({
  position = 'top',
  ...props
}): JSX.Element | null {
  const defaultStyles = getStyles();
  console.log('defaultStyyles', defaultStyles);
  const messageProps = useMessageProps(props, defaultStyles);

  console.log('banner message props', props);

  return (
    <MessageLayout
      styles={defaultStyles}
      layout={props.layout}
      {...props}
      {...messageProps}
    />
  );
}
