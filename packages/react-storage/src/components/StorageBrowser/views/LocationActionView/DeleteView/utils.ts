import { DeleteHandlerData } from '../../../actions';
import { Task } from '../../../tasks';

export const getFolderText = ({
  data: { fileKey, key },
}: Task<DeleteHandlerData>): string => key.slice(0, -fileKey.length);
