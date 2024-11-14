import React from 'react';

import {
  DescriptionDetailsElement,
  DescriptionListElement,
  DescriptionTermElement,
  ViewElement,
} from '../context/elements';

import { STORAGE_BROWSER_BLOCK_TO_BE_UPDATED } from '../constants';

export interface DescriptionItemProps {
  term?: string;
  details?: string | JSX.Element;
}

interface DescriptionProps {
  descriptions: DescriptionItemProps[];
  className?: string;
}

const Description = ({ term, details }: DescriptionItemProps) => {
  return (
    <ViewElement
      className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__description`}
    >
      <DescriptionTermElement
        className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__description-term`}
        role="term"
      >
        {term}
      </DescriptionTermElement>
      <DescriptionDetailsElement
        className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__description-details`}
        role="definition"
      >
        {details}
      </DescriptionDetailsElement>
    </ViewElement>
  );
};

export const DescriptionList = ({
  descriptions,
  className = '',
}: DescriptionProps): React.JSX.Element => {
  return (
    <DescriptionListElement
      className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__description-list ${className}`}
      role="list"
    >
      {descriptions.map(({ term, details }, index) => (
        <Description
          term={term}
          details={details}
          key={`${index}-description-${term}`}
        />
      ))}
    </DescriptionListElement>
  );
};
