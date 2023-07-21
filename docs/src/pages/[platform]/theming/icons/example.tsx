import {
  CheckboxField,
  Flex,
  IconProvider,
  Rating,
  SearchField,
  SelectField,
  StepperField,
} from '@aws-amplify/ui-react';
import {
  FaCheck,
  FaExpand,
  FaMinus,
  FaPlus,
  FaRegStar,
  FaSearch,
  FaStar,
  FaUpload,
} from 'react-icons/fa';
import {
  FiCheck,
  FiChevronDown,
  FiMinus,
  FiSearch,
  FiStar,
} from 'react-icons/fi';
import { StorageManager } from '@aws-amplify/ui-react-storage';

export default function IconProviderExample() {
  return (
    <IconProvider
      icons={{
        checkbox: {
          checked: <FiCheck />,
          indeterminate: <FiMinus />,
        },
        rating: {
          filled: <FiStar />,
          empty: <FiStar />,
        },
        searchField: {
          search: <FiSearch />,
        },
        select: {
          expand: <FiChevronDown />,
        },
        stepperField: {
          add: <FaPlus />,
          remove: <FaMinus />,
        },
        storageManager: {
          upload: <FaUpload />,
        },
      }}
    >
      <Flex direction="column">
        <Rating value={3.5} />
        <CheckboxField label="Checkbox" name="checkbox" value="true" />
        <CheckboxField
          label="Checkbox"
          name="checkbox"
          value="true"
          isIndeterminate
          checked
        />
        <SearchField label="search" labelHidden />
        <SelectField label="Select" />
        <StepperField label="Stepper" />
        <StorageManager accessLevel="public" maxFileCount={5} />
      </Flex>
    </IconProvider>
  );
}
