import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import type { OmitElements } from '../types';
import { StorageBrowserElements } from '../../context/elements';
import { CLASS_BASE } from '../constants';

const { Span, View, Input, Label, Button } = StorageBrowserElements;
const BLOCK_NAME = `${CLASS_BASE}__target`;

const DestinationContainer = withBaseElementProps(View, {
  className: `${BLOCK_NAME}__destination`,
});

const DestinationLabel = withBaseElementProps(Span, {
  className: `${BLOCK_NAME}__destination__label`,
});

const DestinationValue = withBaseElementProps(Span, {
  className: `${BLOCK_NAME}__destination__value`,
});

export interface DestinationControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> {
  (): React.JSX.Element;
  Container: T['View'];
  Label: T['Span'];
  Value: T['Span'];
}

export const DestinationControl: DestinationControl = () => (
  <DestinationContainer>
    <DestinationLabel />
    <DestinationValue />
  </DestinationContainer>
);

DestinationControl.Container = DestinationContainer;
DestinationControl.Label = DestinationLabel;
DestinationControl.Value = DestinationValue;

const FieldContainer = withBaseElementProps(View, {
  className: `${CLASS_BASE}__target__field`,
});

const FieldLabel = withBaseElementProps(Label, {
  className: `${CLASS_BASE}__target__label`,
});

const FieldInput = withBaseElementProps(Input, {
  className: `${CLASS_BASE}__target__input`,
  type: 'text',
});

const FieldSubmit = withBaseElementProps(Button, {
  className: `${CLASS_BASE}__target__submit`,
  children: 'Submit',
  type: 'submit',
});

interface FieldControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> {
  (): React.JSX.Element;
  Container: T['View'];
  Label: T['Label'];
  Input: T['Input'];
  Submit: T['Button'];
}

const FieldControl: FieldControl = () => {
  return (
    <FieldContainer>
      <FieldLabel />
      <FieldInput />
      <FieldSubmit />
    </FieldContainer>
  );
};

FieldControl.Container = FieldContainer;
FieldControl.Label = FieldLabel;
FieldControl.Input = FieldInput;
FieldControl.Submit = FieldSubmit;

const Container = withBaseElementProps(View, {
  className: BLOCK_NAME,
});

export interface _TargetControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> {
  (): React.JSX.Element;
  Container: T['View'];
  Field: FieldControl<T>;
  Destination: DestinationControl<T>;
}

export interface TargetControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends OmitElements<_TargetControl<T>, 'Container'> {
  (): React.JSX.Element;
}

export const TargetControl: TargetControl = () => {
  return (
    <Container>
      <FieldControl />
      <DestinationControl />
    </Container>
  );
};

TargetControl.Field = FieldControl;
TargetControl.Destination = DestinationControl;
