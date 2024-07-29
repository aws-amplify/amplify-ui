import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import type { OmitElements } from '../types';
import { StorageBrowserElements } from '../../context/elements';
import { CLASS_BASE } from '../constants';

const {
  DefinitionDetail: DefinitionDetailElement,
  DefinitionList,
  DefinitionTerm: DefinitionTermElement,
  View,
} = StorageBrowserElements;

const BLOCK_NAME = `${CLASS_BASE}__definitions`;

/* <Detail /> */
const DefinitionContainer = withBaseElementProps(View, {
  className: `${CLASS_BASE}__definition`,
});

const DefinitionTerm = withBaseElementProps(DefinitionTermElement, {
  className: `${CLASS_BASE}__definition__label`,
});
const DefinitionDetail = withBaseElementProps(DefinitionDetailElement, {
  className: `${CLASS_BASE}__definition__value`,
});

interface DefinitionProps {
  label?: string;
  value?: string;
}
interface Definition<
  T extends StorageBrowserElements = StorageBrowserElements,
> {
  (props: DefinitionProps): React.JSX.Element;
  Container: T['View'];
  Term: T['DefinitionTerm'];
  Detail: T['DefinitionDetail'];
}

const Definition: Definition = (props: DefinitionProps) => {
  const { label, value } = props;

  return (
    <DefinitionContainer>
      <DefinitionTerm>{label}</DefinitionTerm>
      <DefinitionDetail>{value}</DefinitionDetail>
    </DefinitionContainer>
  );
};
Definition.Container = DefinitionContainer;
Definition.Term = DefinitionTerm;
Definition.Detail = DefinitionDetail;

const Container = withBaseElementProps(DefinitionList, {
  className: BLOCK_NAME,
});

type RenderSummaryItem = (props: {
  label: string;
  value: string;
}) => React.JSX.Element;
interface _SummaryControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> {
  (props: { renderSummaryItem?: RenderSummaryItem }): React.JSX.Element;
  Container: T['DefinitionList'];
}

export interface SummaryControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends OmitElements<_SummaryControl<T>, 'Container'> {
  (): React.JSX.Element;
}

export const SummaryControl: SummaryControl = () => (
  <Container>
    {/* Example */}
    <Definition label="Completed" value="0/5" />
  </Container>
);
