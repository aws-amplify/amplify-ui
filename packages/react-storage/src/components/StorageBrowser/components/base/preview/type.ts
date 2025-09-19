export interface PreviewComponentProps {
  url: string;
  fileKey: string;
  showDownload?: boolean;
}

export type PreviewComponent = React.ComponentType<PreviewComponentProps>;
