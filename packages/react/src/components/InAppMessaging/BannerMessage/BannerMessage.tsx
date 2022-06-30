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
      ...props.container.style,
    },
    primaryButton: {
      ...props.primaryButton.style,
    },
    secondaryButton: {
      ...props.secondaryButton.style,
    },
  };

  const styles = getStyles(overrideStyles);
  const messageProps = useMessageProps(props, styles);

  return (
    <MessageLayout
      styles={styles}
      layout={props.layout}
      {...props}
      {...messageProps}
    />
  );
}
