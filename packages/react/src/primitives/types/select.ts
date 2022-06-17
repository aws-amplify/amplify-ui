import * as React from 'react';

import { ViewProps } from './view';
import { Sizes } from './base';

export type SelectVariation = 'quiet';

export interface SelectProps extends ViewProps {
  /**
   * A string providing a hint for a user agent's autocomplete feature
   */
  autoComplete?: string;

  /**
   * Specifies the name of the control used when submitting form data
   */
  name?: string;

  /**
   * Sets the SelectField’s initial value on render
   */
  defaultValue?: string;

  /**
   * Controls the current value when using the SelectField as a controlled component
   */
  value?: string;

  /**
   * Changes the height and font size of the SelectField. Available options are ‘small’, none (default), and ‘large’
   */
  size?: Sizes;

  /**
   * Changes the displayed style of the SelectField. Options include ‘quiet’ and none (default)
   */
  variation?: SelectVariation;

  /**
   * Changes the icon used to expand and collapse the SelectField
   */
  icon?: React.ReactElement;

  /**
   * Controls the color of the icon used to expand and collapse the SelectField
   */
  iconColor?: string;

  /**
   * Sets the text that appears in the form control when it has no value set
   */
  placeholder?: string;

  /**
   * Marks the SelectField as having a validation error
   */
  hasError?: boolean;

  /**
   * A Boolean attribute indicating that the user cannot interact with the control
   */
  isDisabled?: boolean;

  /**
   * A Boolean attribute indicating that an option with a non-empty string value must be selected
   */
  isRequired?: boolean;

  /**
   * Handles changes to the current value when using the SelectField as a controlled component
   */
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}
