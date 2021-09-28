import { BaseStyleProps, ViewProps } from 'dist';

// VisuallyHidden should not support style props
type ViewPropsMinusStyleProps = Omit<ViewProps, keyof BaseStyleProps>;
export interface VisuallyHiddenProps extends ViewPropsMinusStyleProps {}
