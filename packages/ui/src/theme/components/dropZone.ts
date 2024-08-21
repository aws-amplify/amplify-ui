import { Modifiers, ComponentStyles } from './utils';

export type DropZoneTheme<Required extends boolean = false> = ComponentStyles &
  Modifiers<'disabled' | 'active' | 'rejected' | 'accepted', Required>;
