import React from 'react';

import {
  DescriptionDetailsElement,
  DescriptionListElement,
  DescriptionTermElement,
  ViewElement,
} from '../context/elements';

import { CLASS_BASE } from '../views/constants';

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
    <ViewElement className={`${CLASS_BASE}__description`}>
      <DescriptionTermElement
        className={`${CLASS_BASE}__description-term`}
        role="term"
      >
        {term}
      </DescriptionTermElement>
      <DescriptionDetailsElement
        className={`${CLASS_BASE}__description-details`}
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
      className={`${CLASS_BASE}__description-list ${className}`}
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
