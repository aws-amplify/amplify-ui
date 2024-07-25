import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import type { OmitElements } from '../types';
import { StorageBrowserElements } from '../../context/elements';
import { CLASS_BASE } from '../constants';

const { Button, DefinitionDetail, DefinitionList, DefinitionTerm, View } =
  StorageBrowserElements;

const BLOCK_NAME = `${CLASS_BASE}__summary`;

/* <Detail /> */
const DetailContainer = withBaseElementProps(View, {
  className: `${CLASS_BASE}__detail`,
});

const DetailLabel = withBaseElementProps(DefinitionTerm, {
  className: `${CLASS_BASE}__detail__label`,
});
const DetailValue = withBaseElementProps(DefinitionDetail, {
  className: `${CLASS_BASE}__detail__value`,
});

interface DetailProps {
  label?: string;
  value?: string;
}
interface Detail<T extends StorageBrowserElements = StorageBrowserElements> {
  (props: DetailProps): React.JSX.Element;
  Container: T['View'];
  Label: T['DefinitionTerm'];
  Value: T['DefinitionDetail'];
}

const Detail: Detail = (props: DetailProps) => {
  const { label, value } = props;

  return (
    <DetailContainer>
      <DetailLabel>{label}</DetailLabel>
      <DetailValue>{value}</DetailValue>
    </DetailContainer>
  );
};
Detail.Container = DetailContainer;
Detail.Label = DetailLabel;
Detail.Value = DetailValue;

const CompletedControl = ({
  label = 'Completed:',
  value = '0/5',
}: DetailProps) => <Detail label={label} value={value} />;

const NotStartedControl = ({
  label = 'Not started:',
  value = '0/5',
}: DetailProps) => <Detail label={label} value={value} />;

const FailedControl = ({ label = 'Failed', value = '0/5' }: DetailProps) => (
  <Detail label={label} value={value} />
);

const CanceledControl = ({
  label = 'Canceled:',
  value = '0/5',
}: DetailProps) => <Detail label={label} value={value} />;

const DestinationControl = ({
  label = 'Destination:',
  value = '/',
}: DetailProps) => <Detail label={label} value={value} />;

/* <Details /> */

const DetailsContainer = withBaseElementProps(DefinitionList, {
  className: BLOCK_NAME,
});

interface Details<T extends StorageBrowserElements = StorageBrowserElements> {
  (): React.JSX.Element;
  Container: T['DefinitionList'];
  Destination: Detail<T>;
  Completed: Detail<T>;
  Failed: Detail<T>;
  Canceled: Detail<T>;
  NotStarted: Detail<T>;
}

const Details: Details = () => (
  <DetailsContainer>
    <DestinationControl />
    <CompletedControl />
    <CanceledControl />
    <FailedControl />
    <NotStartedControl />
  </DetailsContainer>
);

const detailComponents = {
  Container: DetailContainer,
  Label: DetailLabel,
  Value: DetailValue,
};

Details.Container = DetailsContainer;
Details.Destination = Object.assign(DestinationControl, detailComponents);
Details.Canceled = Object.assign(CanceledControl, detailComponents);
Details.Completed = Object.assign(CompletedControl, detailComponents);
Details.Failed = Object.assign(FailedControl, detailComponents);
Details.NotStarted = Object.assign(NotStartedControl, detailComponents);

const StartButton = withBaseElementProps(Button, {
  className: `${CLASS_BASE}__summary__start`,
  children: 'Start',
});

const CancelButton = withBaseElementProps(Button, {
  className: `${CLASS_BASE}__summary__cancel`,
  children: 'Cancel',
});

export interface _SummaryControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> {
  (): React.JSX.Element;
  Start: T['Button'];
  Cancel: T['Button'];
  Details: Details<T>;
}

export interface SummaryControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends OmitElements<
    _SummaryControl<T>,
    'Container' | 'Start' | 'Cancel' | 'Details'
  > {
  (): React.JSX.Element;
}

export const SummaryControl: SummaryControl = () => (
  <>
    <CancelButton />
    <StartButton />
    <Details />
  </>
);
