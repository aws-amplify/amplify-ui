import React from 'react';

import { CLASS_BASE } from '../constants';
import {
  InputElement,
  ViewElement,
  LabelElement,
} from '../../context/elements/definitions';

const BLOCK_NAME = `${CLASS_BASE}__overwrite`;
const LABEL_TEXT = "Don't overwrite existing files with the same name.";

interface OverwriteControlProps {
  checked?: boolean;
  handleChange?: () => void;
}

export const OverwriteControl = ({
  checked,
  handleChange,
}: OverwriteControlProps): React.JSX.Element => (
  <ViewElement className={BLOCK_NAME}>
    <InputElement
      checked={checked}
      onChange={handleChange}
      type="checkbox"
      id="overwrite"
    />
    <LabelElement htmlFor="overwrite">{LABEL_TEXT}</LabelElement>
  </ViewElement>
);
