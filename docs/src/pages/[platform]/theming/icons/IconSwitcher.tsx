import * as React from 'react';
import {
  CheckboxField,
  Flex,
  IconsProvider,
  Rating,
  SearchField,
  SelectField,
  StepperField,
  IconsContextInterface,
  ToggleButtonGroup,
  ToggleButton,
  Alert,
  PasswordField,
} from '@aws-amplify/ui-react';
import {
  FiAlertCircle,
  FiAlertTriangle,
  FiCheckCircle,
  FiChevronDown,
  FiEye,
  FiEyeOff,
  FiInfo,
  FiMinus,
  FiPlus,
  FiSearch,
  FiStar,
  FiUploadCloud,
} from 'react-icons/fi';
import {
  HiCheck,
  HiCheckCircle,
  HiChevronDown,
  HiExclamation,
  HiExclamationCircle,
  HiEye,
  HiEyeOff,
  HiInformationCircle,
  HiMinus,
  HiOutlineStar,
  HiPlus,
  HiSearch,
  HiStar,
  HiUpload,
} from 'react-icons/hi';
import { StorageManager } from '@aws-amplify/ui-react-storage';
import {
  FcExpand,
  FcHighPriority,
  FcInfo,
  FcKey,
  FcLike,
  FcLikePlaceholder,
  FcLock,
  FcMediumPriority,
  FcMinus,
  FcOk,
  FcPlus,
  FcSearch,
  FcUpload,
} from 'react-icons/fc';

const iconMap: Record<string, IconsContextInterface> = {
  fi: {
    alert: {
      success: <FiCheckCircle />,
      warning: <FiAlertTriangle />,
      error: <FiAlertCircle />,
      info: <FiInfo />,
    },
    passwordField: {
      visibility: <FiEye />,
      visibilityOff: <FiEyeOff />,
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
    alert: {
      success: <HiCheckCircle />,
      warning: <HiExclamation />,
      error: <HiExclamationCircle />,
      info: <HiInformationCircle />,
    },
    checkbox: {
      checked: <HiCheck />,
      indeterminate: <HiMinus />,
    },
    passwordField: {
      visibility: <HiEye />,
      visibilityOff: <HiEyeOff />,
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
  fc: {
    alert: {
      success: <FcOk />,
      warning: <FcMediumPriority />,
      error: <FcHighPriority />,
      info: <FcInfo />,
      close: <FcMinus />,
    },
    passwordField: {
      visibility: <FcKey />,
      visibilityOff: <FcLock />,
    },
    rating: {
      filled: <FcLike />,
      empty: <FcLikePlaceholder />,
    },
    searchField: {
      search: <FcSearch />,
    },
    select: {
      expand: <FcExpand />,
    },
    stepperField: {
      add: <FcPlus />,
      remove: <FcMinus />,
    },
    storageManager: {
      upload: <FcUpload />,
    },
  },
  default: {},
};

export default function IconProviderExample() {
  const [iconSet, setIconSet] = React.useState('default');

  return (
    <IconsProvider icons={iconMap[iconSet]}>
      <Flex direction="column">
        <Flex direction="column" alignItems="center">
          <ToggleButtonGroup
            value={iconSet}
            isExclusive
            size="small"
            onChange={(value) => setIconSet(value as string)}
          >
            <ToggleButton value="default">default</ToggleButton>
            <ToggleButton value="hi">heroicons</ToggleButton>
            <ToggleButton value="fi">feather icons</ToggleButton>
            <ToggleButton value="fc">flat color icons</ToggleButton>
          </ToggleButtonGroup>
        </Flex>

        <Flex direction="row">
          <Flex direction="column" flex="1">
            <Alert isDismissible variation="success">
              Success
            </Alert>
            <Alert isDismissible variation="warning">
              Warning
            </Alert>
            <Alert isDismissible variation="error">
              Error
            </Alert>
            <Alert isDismissible variation="info">
              Info
            </Alert>
          </Flex>

          <Flex direction="column" flex="1">
            <SelectField label="SelectField" labelHidden />
            <PasswordField label="PasswordField" labelHidden />
            <SearchField label="SearchField" />
            <StepperField label="StepperField" labelHidden />
            <Rating value={3.5} />
          </Flex>
        </Flex>
        <StorageManager accessLevel="public" maxFileCount={5} />
      </Flex>
    </IconsProvider>
  );
}
