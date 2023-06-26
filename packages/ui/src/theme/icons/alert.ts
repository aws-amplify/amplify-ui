import { OutputVariantKey } from '../types';
import type { Icon } from './types';

interface BaseAlertIcons {
  // Should do some key in variant thing
  info?: Icon;
  warning?: Icon;
  error?: Icon;
  success?: Icon;
}

export type AlertIcons<OutputType extends OutputVariantKey> =
  OutputType extends 'required'
    ? Required<BaseAlertIcons>
    : OutputType extends 'default'
    ? Required<BaseAlertIcons>
    : BaseAlertIcons;

export const alert: AlertIcons<'default'> = {
  info: {
    pathData:
      'm11 7h2v2h-2zm0 4h2v6h-2zm1-9c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
  },
  warning: {
    pathData: 'm1 21h22l-11-19zm12-3h-2v-2h2zm0-4h-2v-4h2z',
  },
  error: {
    pathData:
      'm12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm1 15h-2v-2h2zm0-4h-2v-6h2z',
  },
  success: {
    pathData:
      'm12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42-6.59 6.59-2.59-2.58-1.41 1.41 4 4 8-8z',
  },
};
