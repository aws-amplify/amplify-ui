import * as React from 'react';

import { CheckboxField, Flex, View } from '@aws-amplify/ui-react';

export const CheckboxFieldIndeterminateExample = () => {
  const [checkedItems, setCheckedItems] = React.useState([false, false]);
  const checkedItemsRef = React.useRef(null);
  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  if (isIndeterminate) {
    checkedItemsRef.current = [...checkedItems];
  }
  const handleAllPetsChange = () => {
    if (isIndeterminate) {
      setCheckedItems([true, true]);
    } else if (allChecked) {
      setCheckedItems([false, false]);
    } else if (checkedItemsRef.current) {
      setCheckedItems(checkedItemsRef.current);
    } else {
      setCheckedItems([true, true]);
    }
  };

  const handleCatChange = (e) => {
    const newCheckedItems = [e.target.checked, checkedItems[1]];
    if (!newCheckedItems.some(Boolean) || newCheckedItems.every(Boolean)) {
      checkedItemsRef.current = null;
    }
    setCheckedItems(newCheckedItems);
  };

  const handleDogChange = (e) => {
    const newCheckedItems = [checkedItems[0], e.target.checked];
    if (!newCheckedItems.some(Boolean) || newCheckedItems.every(Boolean)) {
      checkedItemsRef.current = null;
    }
    setCheckedItems(newCheckedItems);
  };

  return (
    <Flex direction="column" gap="0">
      <CheckboxField
        name="all-pets"
        label="All Pets"
        value="allPets"
        checked={allChecked}
        isIndeterminate={isIndeterminate}
        onChange={handleAllPetsChange}
      />
      <View paddingLeft="25px">
        <CheckboxField
          name="cat"
          label="Cat"
          value="cat"
          checked={checkedItems[0]}
          onChange={handleCatChange}
        />
        <CheckboxField
          name="dog"
          label="Dog"
          value="dog"
          checked={checkedItems[1]}
          onChange={handleDogChange}
        />
      </View>
    </Flex>
  );
};
