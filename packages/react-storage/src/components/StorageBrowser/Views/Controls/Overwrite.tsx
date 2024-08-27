import React from 'react';

import { CLASS_BASE } from '../constants';
import {
  InputElement,
  ViewElement,
  LabelElement,
} from '../../context/elements/definitions';

const BLOCK_NAME = `${CLASS_BASE}__overwrite`;
export const LABEL_TEXT = 'Overwrite existing files';

interface OverwriteControlProps {
  defaultChecked?: boolean;
  handleChange?: () => void;
}

export const OverwriteControl = ({
  defaultChecked,
  handleChange,
}: OverwriteControlProps): React.JSX.Element => (
  <ViewElement className={BLOCK_NAME}>
    <InputElement
      defaultChecked={defaultChecked}
      onChange={handleChange}
      type="checkbox"
      id="overwrite"
    />
    <LabelElement htmlFor="overwrite">{LABEL_TEXT}</LabelElement>
  </ViewElement>
);
