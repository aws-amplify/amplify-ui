import { CopyHandlerData } from '../../../actions';
import { Task } from '../../../tasks';

export const getFolderText = ({
  data: { fileKey, sourceKey },
}: Task<CopyHandlerData>): string => sourceKey.slice(0, -fileKey.length);
