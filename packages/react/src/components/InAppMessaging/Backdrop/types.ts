import { FlexProps } from '../../../primitives/types';

export interface BackdropProps extends FlexProps {
  /**
   * @description
   * Content of the backdrop
   */
  children?: React.ReactNode;
}
