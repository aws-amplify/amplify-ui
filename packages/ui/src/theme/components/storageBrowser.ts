import type { Modifiers, ComponentStyles, Elements } from './utils';

type TableCellVariations = 'download' | 'select' | 'cancel';

export type StorageBrowserTheme<Required extends boolean = false> =
  ComponentStyles &
    Elements<
      {
        error?: ComponentStyles;
        exit?: ComponentStyles;
        navigation?: ComponentStyles;
        title?: ComponentStyles;
        controls?: ComponentStyles;
        pagination?: ComponentStyles;
        search?: ComponentStyles;
        refresh?: ComponentStyles;
        menu?: ComponentStyles;
        summary?: ComponentStyles;
        footer?: ComponentStyles;
        status?: ComponentStyles;
        message?: ComponentStyles;
        buttons?: ComponentStyles;

        'drop-zone'?: ComponentStyles;

        'data-table'?: ComponentStyles;
        'table-head'?: ComponentStyles;
        'table-header'?: Modifiers<TableCellVariations, Required> &
          ComponentStyles;
        'table-body'?: ComponentStyles;
        'table-row'?: ComponentStyles;
        'table-data-cell'?: Modifiers<TableCellVariations, Required> &
          ComponentStyles;
      },
      Required
    >;
