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

        'content-with-preview'?: ComponentStyles;
        'file-preview'?: ComponentStyles;
        'file-preview-header'?: ComponentStyles;
        'file-preview-content'?: ComponentStyles;
        'file-preview-section'?: ComponentStyles;
        'file-preview-title'?: ComponentStyles;
        'file-metadata'?: ComponentStyles;
        'file-metadata-item'?: ComponentStyles;
        'file-metadata-label'?: ComponentStyles;
        'file-metadata-value'?: ComponentStyles;
        'preview-fallback'?: ComponentStyles;
        'preview-placeholder'?: ComponentStyles;
        'text-preview'?: ComponentStyles;
        'video-preview'?: ComponentStyles;
      },
      Required
    >;
