import { Modifiers, BaseProperties } from './utils';

export type DropZoneTheme<Required extends boolean = false> = BaseProperties &
  Modifiers<'disabled' | 'active' | 'rejected' | 'accepted', Required>;
