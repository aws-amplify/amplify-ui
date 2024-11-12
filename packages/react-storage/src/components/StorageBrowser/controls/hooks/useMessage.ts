import { MessageProps } from '../../composables/Message';
import { useControlsContext } from '../../controls/context';

export const useMessage = (): MessageProps => {
  const { data, onMessageDismiss: onDismiss } = useControlsContext();
  const { messageContent: content, messageType: type } = data;

  return { content, onDismiss, type };
};
