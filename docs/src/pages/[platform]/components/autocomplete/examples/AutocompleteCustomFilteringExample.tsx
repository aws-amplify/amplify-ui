import { Autocomplete } from '@aws-amplify/ui-react';
import * as React from 'react';

const options = [
  {
    id: 'apple',
    label: 'apple',
    description: 'An apple is an edible fruit produced by an apple tree.',
  },
  {
    id: 'banana',
    label: 'banana',
    description:
      'A banana is an elongated, edible fruit produced by several kinds of large herbaceous flowering plants.',
  },
  {
    id: 'cherry',
    label: 'cherry',
    description:
      'A cherry is the fruit of many plants of the genus Prunus, and is a fleshy drupe.',
  },
  {
    id: 'grape',
    label: 'grape',
    description:
      'A grape is a fruit, botanically a berry, of the deciduous woody vines of the flowering plant genus Vitis.',
  },
  {
    id: 'kiwis',
    label: 'kiwis',
    description:
      'Kiwifruit or Chinese gooseberry is the edible berry of several species of woody vines in the genus Actinidia.',
  },
  {
    id: 'lemon',
    label: 'lemon',
    description:
      'The lemon is a species of small evergreen trees in the flowering plant family Rutaceae.',
  },
  {
    id: 'mango',
    label: 'mango',
    description:
      'A mango is an edible stone fruit produced by the tropical tree Mangifera indica.',
  },
  {
    id: 'orange',
    label: 'orange',
    description:
      'An orange is a fruit of various citrus species in the family Rutaceae.',
  },
  {
    id: 'strawberry',
    label: 'strawberry',
    description:
      'The garden strawberry is a widely grown hybrid species of the genus Fragaria, collectively known as the strawberries.',
  },
];

export const AutocompleteCustomFilteringExample = () => {
  // Create your own filtering
  const filteringOption = (option, value) => {
    // filter options against description
    return option?.description?.includes(value);
  };

  return (
    <Autocomplete
      label="Autocomplete with custom filtering"
      filteringOption={filteringOption}
      options={options}
    />
  );
};
