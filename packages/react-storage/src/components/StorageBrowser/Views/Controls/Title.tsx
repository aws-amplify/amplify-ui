import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import { StorageBrowserElements } from '../../context/elements';
import { CLASS_BASE } from '../constants';

const { Heading } = StorageBrowserElements;

const BLOCK_NAME = `${CLASS_BASE}__title`;

interface TitleControlProps {
  children?: string;
}

export interface TitleControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> {
  ({ children }: TitleControlProps): React.JSX.Element;
  Heading: T['Heading'];
}

const Title = withBaseElementProps(Heading, {
  className: `${BLOCK_NAME}`,
});

export const TitleControl: TitleControl = ({ children }) => (
  <Title>{children}</Title>
);

TitleControl.Heading = Title;
