import { useMessageProps } from '../hooks';
import { MessageLayout } from '../MessageLayout';

import { getStyles } from './styles';

export default function BannerMessage({
  position = 'top',
  ...props
}): JSX.Element | null {
  // get and concat override styles from props
  const overrideStyles = {
    body: {
      ...props.body.style,
    },
    container: {
      ...props.container.style,
    },
    header: {
      ...props.header.style,
    },
    primaryButton: {
      ...props.primaryButton.style,
    },
    secondaryButton: {
      ...props.secondaryButton.style,
    },
  };

  const styles = getStyles(overrideStyles, props.layout);
  const messageProps = useMessageProps(props, styles);

  console.log(messageProps);
  console.log(props);

  return <MessageLayout {...props} {...messageProps} />;
}
