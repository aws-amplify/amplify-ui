import * as React from 'react';
import {
  CheckboxField,
  Flex,
  IconProvider,
  Rating,
  SearchField,
  SelectField,
  StepperField,
  IconContextInterface,
  ToggleButtonGroup,
  ToggleButton,
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
  FiPlus,
  FiSearch,
  FiStar,
  FiUpload,
  FiUploadCloud,
} from 'react-icons/fi';
import {
  HiCheck,
  HiChevronDown,
  HiMinus,
  HiOutlineStar,
  HiPlus,
  HiSearch,
  HiStar,
  HiUpload,
} from 'react-icons/hi';
import { StorageManager } from '@aws-amplify/ui-react-storage';

const iconMap: Record<string, IconContextInterface> = {
  fi: {
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
      add: <FiPlus />,
      remove: <FiMinus />,
    },
    storageManager: {
      upload: <FiUploadCloud />,
    },
  },
  hi: {
    checkbox: {
      checked: <HiCheck />,
      indeterminate: <HiMinus />,
    },
    rating: {
      filled: <HiStar />,
      empty: <HiOutlineStar />,
    },
    searchField: {
      search: <HiSearch />,
    },
    select: {
      expand: <HiChevronDown />,
    },
    stepperField: {
      add: <HiPlus />,
      remove: <HiMinus />,
    },
    storageManager: {
      upload: <HiUpload />,
    },
  },
  default: {},
};

export default function IconProviderExample() {
  const [iconSet, setIconSet] = React.useState('default');

  return (
    <IconProvider icons={iconMap[iconSet]}>
      <ToggleButtonGroup
        value={iconSet}
        isExclusive
        size="small"
        onChange={(value) => setIconSet(value as string)}
      >
        <ToggleButton value="default">default</ToggleButton>
        <ToggleButton value="hi">heroicons</ToggleButton>
        <ToggleButton value="fi">feather icons</ToggleButton>
      </ToggleButtonGroup>
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
