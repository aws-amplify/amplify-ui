import React from 'react';

import {
  DefinitionDetailElement,
  DefinitionListElement,
  DefinitionTermElement,
  ViewElement,
} from '../../context/elements/definitions';

import { CLASS_BASE } from '../constants';

const BLOCK_NAME = `${CLASS_BASE}__summary`;

interface DefinitionProps {
  label?: string;
  value?: number;
  total?: number;
}

const Definition = ({ label, value, total }: DefinitionProps) => {
  return (
    <ViewElement className={`${BLOCK_NAME}__definition`}>
      <DefinitionTermElement className={`${BLOCK_NAME}__definition__term`}>
        {label}
      </DefinitionTermElement>
      <DefinitionDetailElement className={`${BLOCK_NAME}__definition__detail`}>
        {value ?? 0}/{total}
      </DefinitionDetailElement>
    </ViewElement>
  );
};

interface SummaryControlProps {
  total?: number;
  complete?: number;
  queued?: number;
  canceled?: number;
  failed?: number;
}

export const SummaryControl = ({
  total,
  complete,
  queued,
  canceled,
  failed,
}: SummaryControlProps): React.JSX.Element => (
  <DefinitionListElement className={BLOCK_NAME}>
    <Definition label="Completed" value={complete} total={total} />
    <Definition label="Failed" value={failed} total={total} />
    <Definition label="Canceled" value={canceled} total={total} />
    <Definition label="Not started" value={queued} total={total} />
  </DefinitionListElement>
);
