import { FlexProps } from './flex';

interface Origin {
  horizontal?: 'start' | 'center' | 'end';
  vertical?: 'start' | 'center' | 'end';
}

export interface OverlayProps extends FlexProps {
  /**
   * @description
   * The anchor {horizontal, vertical} origin of content in the overlay.
   */
  origin?: Origin;
}
