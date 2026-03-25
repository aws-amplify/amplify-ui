import type { DownloadHandler } from './download';
import { downloadHandler } from './download';
import { zipDownloadHandler } from './zipdownload';

export const composedDownloadHandler: DownloadHandler = (input) =>
  input.all.length === 1 ? downloadHandler(input) : zipDownloadHandler(input);
