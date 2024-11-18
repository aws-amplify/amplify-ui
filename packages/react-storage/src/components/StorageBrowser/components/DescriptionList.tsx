import React from 'react';

import {
  DescriptionDetailsElement,
  DescriptionListElement,
  DescriptionTermElement,
  ViewElement,
} from '../context/elements';

import { STORAGE_BROWSER_BLOCK } from '../constants';

export interface DescriptionItemProps {
  term?: string | string[];
  details?: string | string[];
}

interface DescriptionProps {
  descriptions: DescriptionItemProps[];
  className?: string;
}

const Description = ({ term, details }: DescriptionItemProps) => {
  return (
    <ViewElement className={`${STORAGE_BROWSER_BLOCK}__description`}>
      <DescriptionTermElement
        className={`${STORAGE_BROWSER_BLOCK}__description-term`}
        role="term"
      >
        {term}
      </DescriptionTermElement>
      <DescriptionDetailsElement
        className={`${STORAGE_BROWSER_BLOCK}__description-details`}
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
      className={`${STORAGE_BROWSER_BLOCK}__description-list ${className}`}
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
