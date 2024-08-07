import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import type { OmitElements } from '../types';
import { StorageBrowserElements } from '../../context/elements';
import { CLASS_BASE } from '../constants';

const { DefinitionDetail, DefinitionList, DefinitionTerm, View } =
  StorageBrowserElements;

const BLOCK_NAME = `${CLASS_BASE}__summary`;

/* <Definition /> */
const DefinitionContainer = withBaseElementProps(View, {
  className: `${BLOCK_NAME}__definition`,
});

const Term = withBaseElementProps(DefinitionTerm, {
  className: `${BLOCK_NAME}__definition__term`,
});
const Detail = withBaseElementProps(DefinitionDetail, {
  className: `${BLOCK_NAME}__definition__detail`,
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
      <Term>{label}</Term>
      <Detail>{value}</Detail>
    </DefinitionContainer>
  );
};
Definition.Container = DefinitionContainer;
Definition.Term = Term;
Definition.Detail = Detail;

/* <Summary /> */

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
