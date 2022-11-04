import * as React from 'react';
import classNames from 'classnames';
import { Flex } from '@aws-amplify/ui-react';
import { FeatureItem } from './FeatureItem';
import styles from 'src/styles/studio/features.module.scss';

export const Features = () => {
  return (
    <Flex className={classNames(styles['feature-container'])}>
      <Flex>
        <FeatureItem
          icon="/studio/configure-form-inputs.svg"
          title="Configure form inputs"
          description="Select form inputs to edit, remove, or add in to your existing form"
        />
        <FeatureItem
          icon="/studio/style-your-form.svg"
          title="Style your form"
          description="Use colors and spacing yada yada yaday"
        />
      </Flex>
      <Flex>
        <FeatureItem
          icon="/studio/customize-display.svg"
          title="Customize display"
          description="Click on any input to edit label, placeholder, or description text"
        />
        <FeatureItem
          icon="/studio/add-validation.svg"
          title="Add validation"
          description="Add custom validation rules and error messages to any input"
        />
      </Flex>
    </Flex>
  );
};
