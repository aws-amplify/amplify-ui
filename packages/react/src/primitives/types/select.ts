import * as React from 'react';

import { ElementType, PrimitiveProps, BaseViewProps } from './view';
import { Sizes } from './base';

export type SelectVariation = 'quiet';

export interface BaseSelectProps extends BaseViewProps {
  /**
   * @description
   * A string providing a hint for a user agent's autocomplete feature
   */
  autoComplete?: string;

  /**
   * @description
   * Specifies the name of the control used when submitting form data
   */
  name?: string;

  /**
   * @description
   * Sets the SelectField’s initial value on render
   */
  defaultValue?: string;

  /**
   * @description
   * Controls the current value when using the SelectField as a controlled component
   */
  value?: string;

  /**
   * @description
   * Changes the height and font size of the SelectField. Available options are ‘small’, none (default), and ‘large’
   */
  size?: Sizes;

  /**
   * @description
   * Changes the displayed style of the SelectField. Options include ‘quiet’ and none (default)
   */
  variation?: SelectVariation;

  /**
   * @description
   * Changes the icon used to expand and collapse the SelectField
   */
  icon?: React.ReactElement;

  /**
   * @description
   * Controls the color of the icon used to expand and collapse the SelectField
   */
  iconColor?: string;

  /**
   * @description
   * Sets the text that appears in the form control when it has no value set
   */
  placeholder?: string;

  /**
   * @description
   * Marks the SelectField as having a validation error
   */
  hasError?: boolean;

  /**
   * @description
   * A Boolean attribute indicating that the user cannot interact with the control
   */
  isDisabled?: boolean;

  /**
   * @description
   * A Boolean attribute indicating that an option with a non-empty string value must be selected
   */
  isRequired?: boolean;

  /**
   * @description
   * Handles changes to the current value when using the SelectField as a controlled component
   */
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

export type SelectProps<Element extends ElementType = 'select'> =
  PrimitiveProps<BaseSelectProps, Element>;
