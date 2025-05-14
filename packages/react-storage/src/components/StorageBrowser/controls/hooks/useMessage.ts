import type { MessageProps } from '../../components/composables/Message';
import { useControlsContext } from '../context';

export const useMessage = (): MessageProps => {
  const {
    data: { message = {} },
  } = useControlsContext();

  return message;
};
