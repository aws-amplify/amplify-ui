import { ViewStyle } from 'react-native';
import { LabelPosition } from './types';

const FLEX_DIRECTIONS: Record<LabelPosition, ViewStyle['flexDirection']> = {
  start: 'row-reverse',
  end: 'row',
  top: 'column-reverse',
  bottom: 'column',
};

/**
 * The `flexDirection` value returned from `getFlexDirectionFromLabelPosition`
 * assumes a `Label` component follows the `ActionStart` component it labels inside
 * the `Container` that the `flexDirection` is applied to.
 *
 * Example Usage:
 * ```jsx
 *   const flexDirection = getFlexDirectionFromLabelPosition(labelPosition);
 *   <Container style={{ flexDirection }}>
 *     <ActionStart />
 *     <Label />
 *   </Container>
 * ```
 */
export const getFlexDirectionFromLabelPosition = (
  position: LabelPosition
): ViewStyle['flexDirection'] => FLEX_DIRECTIONS[position];
