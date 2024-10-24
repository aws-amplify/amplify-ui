import React from 'react';

import { Controls } from '../Controls';
import { ButtonElement } from '../../context/elements';
import { DataTableControl } from '../../controls/DataTableControl';
import { ControlsContextProvider } from '../../controls/context';
import { CLASS_BASE } from '../constants';
import { HeadingControl } from '../Controls/Heading';
import { Title } from './Controls/Title';
import { UseDeleteActionView } from './hooks/useDeleteActionView';
import { StatusDisplayControl } from '../../controls/StatusDisplayControl';
import { displayText } from '../../displayText/en';

const { Exit, Primary } = Controls;

const { actionSelectedText } = displayText;

export const DeleteFileControls = (): React.JSX.Element => {
  const {
    controlsContextValue,
    disableCancel,
    disableClose,
    disablePrimary,
    onClose,
    onCancel,
    onStart,
  } = UseDeleteActionView();

  return (
    <ControlsContextProvider {...controlsContextValue}>
      <Exit onClick={onClose} disabled={disableClose} />
      <Title />
      <Primary
        disabled={disablePrimary}
        onClick={() => {
          onStart();
        }}
      >
        Start
      </Primary>
      <ButtonElement
        variant="cancel"
        disabled={disableCancel}
        className={`${CLASS_BASE}__cancel`}
        onClick={() => {
          onCancel();
        }}
      >
        Cancel
      </ButtonElement>
      <StatusDisplayControl
        className={`${CLASS_BASE}__action-status-display`}
      />
      <HeadingControl level={3}>{actionSelectedText}</HeadingControl>
      <DataTableControl className="storage-browser__table" />
    </ControlsContextProvider>
  );
};
