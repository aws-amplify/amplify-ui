import { BaseComponentProps } from './base';
import { ViewAsHTMLElementTypes } from './view';

export interface VisuallyHiddenProps extends BaseComponentProps {
  as?: ViewAsHTMLElementTypes;
}
