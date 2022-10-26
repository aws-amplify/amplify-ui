/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Button } from '../../../../primitives/Button';
import { UploaderButtonProps } from '../types';

export function UploaderButton({
  multiple,
  acceptedFileTypes,
  onClick,
}: UploaderButtonProps): JSX.Element {
  const hiddenInput = React.useRef<HTMLInputElement>();
  function handleClick() {
    // stubbed
  }

  return (
    <>
      <Button>Upload file</Button>
      <input />
    </>
  );
}
