import { UploadHandlerData } from '../../../actions';
import { Task } from '../../../tasks';

export const getFolderText = ({
  data: {
    file: { webkitRelativePath },
  },
}: Task<UploadHandlerData>): string =>
  webkitRelativePath
    ? webkitRelativePath.slice(0, webkitRelativePath.lastIndexOf('/') + 1)
    : '-';
