import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import { StorageBrowserElements } from '../../context/elements';

const { Heading } = StorageBrowserElements;

const BLOCK_NAME = `title`;

export interface TitleControl<
  T extends Partial<StorageBrowserElements> = StorageBrowserElements,
> {
  (): React.JSX.Element;
  Title: T['Heading'];
}

const Title = withBaseElementProps(Heading, {
  className: `${BLOCK_NAME}__heading`,
});

export const TitleControl: TitleControl = () => <Title />;

TitleControl.Title = Title;
