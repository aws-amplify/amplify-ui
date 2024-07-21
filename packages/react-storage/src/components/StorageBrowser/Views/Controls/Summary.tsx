import React from 'react';
import { StorageBrowserElements } from '../../context/elements';

const { Button, Span, Text } = StorageBrowserElements;

interface Details<T extends StorageBrowserElements = StorageBrowserElements> {
  (): React.JSX.Element;
  Container: T['Span'];
  Destination: T['Text'];
  Completed: T['Text'];
  Failed: T['Text'];
  Canceled: T['Text'];
  NotStarted: T['Text'];
}

const Details: Details = () => <>Hi</>;

Details.Canceled = Text;
Details.Completed = Text;
Details.Container = Span;
Details.Destination = Text;
Details.Failed = Text;
Details.NotStarted = Text;

export interface SummaryControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> {
  (): React.JSX.Element;
  Start: T['Button'];
  Cancel: T['Button'];
  Details: Details<T>;
}

export const SummaryControl: SummaryControl = () => <>Summary</>;

SummaryControl.Cancel = Button;
SummaryControl.Details = Details;
SummaryControl.Start = Button;
