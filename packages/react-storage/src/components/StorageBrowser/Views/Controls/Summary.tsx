import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

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
  label = 'Completed',
  value = '0/5',
}: DetailProps) => <Detail label={label} value={value} />;

const NotStartedControl = ({
  label = 'Not started',
  value = '0/5',
}: DetailProps) => <Detail label={label} value={value} />;

const FailedControl = ({ label = 'Failed', value = '0/5' }: DetailProps) => (
  <Detail label={label} value={value} />
);

const CanceledControl = ({
  label = 'Canceled',
  value = '0/5',
}: DetailProps) => <Detail label={label} value={value} />;

/* <Details /> */

const DetailsContainer = withBaseElementProps(DefinitionList, {
  className: BLOCK_NAME,
});

interface Details<T extends StorageBrowserElements = StorageBrowserElements> {
  (): React.JSX.Element;
  Container: T['DefinitionList'];
  Completed: Detail<T>;
  Failed: Detail<T>;
  Canceled: Detail<T>;
  NotStarted: Detail<T>;
}

const Details: Details = () => (
  <DetailsContainer>
    <CompletedControl />
    <CanceledControl />
    <FailedControl />
    <NotStartedControl />
  </DetailsContainer>
);

Details.Container = DetailsContainer;
Details.Canceled = CanceledControl;
Details.Completed = CompletedControl;
Details.Failed = FailedControl;
Details.NotStarted = NotStartedControl;
// Details.Destination = Text;
export interface SummaryControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> {
  (): React.JSX.Element;
  Start: T['Button'];
  Cancel: T['Button'];
  Details: Details<T>;
}

export const SummaryControl: SummaryControl = () => (
  <>
    Buttons
    <Details />
  </>
);

SummaryControl.Cancel = Button;
SummaryControl.Details = Details;
SummaryControl.Start = Button;
