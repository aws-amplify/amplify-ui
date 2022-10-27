import { Autocomplete, Flex, Badge } from '@aws-amplify/ui-react';
import * as React from 'react';

const options = [
  { id: 'apple', label: 'apple' },
  { id: 'banana', label: 'banana' },
  { id: 'cherry', label: 'cherry' },
  { id: 'grape', label: 'grape' },
  { id: 'kiwis', label: 'kiwis' },
  { id: 'lemon', label: 'lemon' },
  { id: 'mango', label: 'mango' },
  { id: 'orange', label: 'orange' },
  { id: 'strawberry', label: 'strawberry' },
];

export const AutocompleteBadgeExample = () => {
  const [value, setValue] = React.useState('');
  const [badges, setBadges] = React.useState([]);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  // It is your responsibility to set up onSelect
  const onSelect = (option) => {
    const { label } = option;
    setValue('');
    setBadges([...badges, label]);
  };

  // It is your responsibility to set up onClear
  const onClear = () => {
    setValue('');
  };

  return (
    <Flex direction="column">
      <Autocomplete
        label="Controlled autocomplete"
        options={options}
        value={value}
        onChange={onChange}
        onClear={onClear}
        onSelect={onSelect}
      />
      <Flex direction="row">
        {badges.map((badge) => (
          <Badge
            onClick={() => {
              setBadges(badges.filter((b) => b !== badge));
            }}
          >
            {badge}
          </Badge>
        ))}
      </Flex>
    </Flex>
  );
};
