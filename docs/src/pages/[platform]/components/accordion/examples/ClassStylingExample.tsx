import * as React from 'react';
import { Accordion } from '@aws-amplify/ui-react';

const accordionItems = [
  {
    title: 'Section 1 title',
    value: 'item-1',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    title: 'Section 2 title',
    value: 'item-2',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    title: 'Section 3 title',
    value: 'item-3',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
];

export const ClassStylingAccordion = () => {
  return (
    <Accordion className="my-accordion">
      {accordionItems.map(({ title, value, content }) => (
        <Accordion.Item value={value} key={value}>
          <Accordion.Trigger>
            {title}
            <Accordion.Icon />
          </Accordion.Trigger>
          <Accordion.Content>{content}</Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};
