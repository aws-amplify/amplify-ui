import React from 'react';
import {
  Collection,
  Card,
  Image,
  Heading,
  Text,
  Button,
} from '@aws-amplify/ui-react';

// interface MyList {
//   title: string;
//   description: string;
//   emoji: string;
// }

export const CollectionDemo = () => {
  // const list = [1, 2, 3];
  const list = [
    {
      title: 'title',
      description: 'description',
      emoji: '🤣',
    },
    {
      title: 'title2',
      description: 'description2',
      emoji: '👍',
    },
    {
      title: 'title3',
      description: 'description3',
      emoji: '🤦‍♂️',
    },
  ];

  return (
    <div>
      <Collection
        items={list}
        display="list"
        direction="row"
        gap="20px"
        justifyContent="space-between"
      >
        {(item, index) => (
          <div key={index}>
            <div>{item.emoji}</div>
          </div>
        )}
      </Collection>
    </div>
  );
};
