import React from 'react';

import { ButtonElement } from '../../context/elements/definitions';
import { IconElement } from '../../context/elements/IconElement';

import { CLASS_BASE } from '../constants';

const BLOCK_NAME = `${CLASS_BASE}__exit`;
interface ExitControlProps {
  onClick?: () => void;
}

export const ExitControl = ({
  onClick,
}: ExitControlProps): React.JSX.Element => (
  <ButtonElement className={BLOCK_NAME} variant="exit" onClick={onClick}>
    <IconElement className={`${BLOCK_NAME}__icon`} variant="exit" /> Back
  </ButtonElement>
);
