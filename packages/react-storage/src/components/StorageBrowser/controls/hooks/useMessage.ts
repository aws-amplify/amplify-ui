import { MessageProps } from '../../composables/Message';
import { useControlsContext } from '../../controls/context';

export const useMessage = (): MessageProps => {
  const {
    data: { message = {} },
  } = useControlsContext();

  return message;
};
