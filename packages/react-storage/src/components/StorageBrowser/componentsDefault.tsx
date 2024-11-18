import * as React from 'react';
import {
  Breadcrumbs,
  TextField,
  SearchField as AmplifySearchField,
  Pagination as AmplifyPagination,
  Loader,
  CheckboxField,
  MenuItem,
  Menu,
  Button,
  View,
} from '@aws-amplify/ui-react';
import { Components } from './ComponentsProvider';
import { IconElement } from './context/elements';
import { STORAGE_BROWSER_BLOCK } from './constants';

const OverwriteToggle: Components['OverwriteToggle'] = ({
  isDisabled,
  isOverwritingEnabled,
  label = '',
  onToggle,
}) => {
  return (
    <CheckboxField
      name={label}
      label={label}
      labelPosition="end"
      isDisabled={isDisabled}
      checked={isOverwritingEnabled}
      onChange={() => {
        onToggle?.();
      }}
    />
  );
};

const SearchSubfoldersToggle: Components['SearchSubfoldersToggle'] = ({
  isSearchingSubfolders,
  label = '',
  onToggle,
}) => {
  return (
    <CheckboxField
      name={label}
      label={label}
      labelPosition="end"
      checked={isSearchingSubfolders}
      onChange={() => {
        onToggle?.();
      }}
    />
  );
};

const Pagination: Components['Pagination'] = ({
  page = 1,
  onPaginate,
  hasNextPage,
  highestPageVisited,
}) => {
  return (
    <AmplifyPagination
      currentPage={page}
      totalPages={highestPageVisited ?? 1}
      hasMorePages={hasNextPage}
      siblingCount={1}
      onChange={(index) => {
        onPaginate?.(index ?? 0);
      }}
      onNext={() => {
        onPaginate?.(page + 1);
      }}
      onPrevious={() => {
        onPaginate?.(page - 1);
      }}
    />
  );
};

const SearchField: Components['SearchField'] = ({
  onQueryChange,
  onSearch,
  onClear,
  placeholder,
  label,
  query,
}) => {
  return (
    <AmplifySearchField
      label={label}
      size="small"
      clearButtonLabel="Clear search"
      placeholder={placeholder}
      value={query}
      onChange={(e) => {
        onQueryChange?.(e.target.value);
      }}
      onSubmit={() => {
        onSearch?.();
      }}
      onClear={() => {
        onClear?.();
      }}
    />
  );
};

const Navigation: Components['Navigation'] = ({ items }) => {
  return (
    <Breadcrumbs.Container>
      {items.map((item, i) => {
        return (
          <Breadcrumbs.Item key={i}>
            <Breadcrumbs.Link
              as={item.isCurrent ? 'span' : 'button'}
              isCurrent={item.isCurrent}
              onClick={item.onNavigate}
            >
              {item.name}
            </Breadcrumbs.Link>
            {item.isCurrent ? null : <Breadcrumbs.Separator />}
          </Breadcrumbs.Item>
        );
      })}
    </Breadcrumbs.Container>
  );
};

const LoadingIndicator: Components['LoadingIndicator'] = ({ isLoading }) => {
  if (isLoading) {
    return (
      <Loader
        className="amplify-storage-browser__loader"
        variation="linear"
        size="small"
      />
    );
  }
};

const FolderNameField: Components['FolderNameField'] = ({
  onChange,
  label,
  placeholder,
  validationMessage,
  onValidate,
}) => {
  const handleValidate = ({
    target: { value },
  }:
    | React.ChangeEvent<HTMLInputElement>
    | React.FocusEvent<HTMLInputElement>) => {
    onValidate?.(value);
  };
  return (
    <TextField
      label={label}
      placeholder={placeholder}
      errorMessage={validationMessage}
      hasError={!!validationMessage}
      onBlur={handleValidate}
      onChange={(event) => {
        const { value } = event.target;
        handleValidate?.(event);
        onChange?.(value);
      }}
    />
  );
};

const DataRefresh: Components['DataRefresh'] = ({ onRefresh }) => {
  return (
    <Button
      onClick={() => {
        onRefresh?.();
      }}
    >
      <IconElement className="amplify-icon" variant="refresh" />
    </Button>
  );
};

const ActionsList: Components['ActionsList'] = ({
  items,
  onActionSelect,
  isDisabled,
}) => {
  return (
    <Menu
      isDisabled={isDisabled}
      trigger={
        <Button ariaLabel="Menu Toggle">
          <IconElement className="amplify-icon" variant="menu" />
        </Button>
      }
    >
      {items
        .filter(({ isHidden }) => !isHidden)
        .map(({ actionType, icon, label, isDisabled }, i) => {
          return (
            <MenuItem
              key={i}
              size="small"
              gap="xs"
              isDisabled={isDisabled}
              onClick={() => {
                onActionSelect?.(actionType);
              }}
            >
              {icon && <IconElement variant={icon} />}
              {label}
            </MenuItem>
          );
        })}
    </Menu>
  );
};

const StatusDisplay: Components['StatusDisplay'] = ({ statuses, total }) => {
  if (!statuses?.length) {
    return null;
  }

  return (
    <View as="dl" className={`${STORAGE_BROWSER_BLOCK}__status-display`}>
      {statuses.map(({ name, count }, i) => (
        <View as="div" className={`${STORAGE_BROWSER_BLOCK}__status`} key={i}>
          <View as="dt" className={`${STORAGE_BROWSER_BLOCK}__status-label`}>
            {name}
          </View>
          <View
            as="dd"
            className={`${STORAGE_BROWSER_BLOCK}__status-value`}
          >{`${count}/${total}`}</View>
        </View>
      ))}
    </View>
  );
};

const ActionDestination: Components['ActionDestination'] = ({
  isNavigable,
  items,
  label,
}) => {
  if (!items.length) {
    return null;
  }

  return (
    <View as="dl" className={`${STORAGE_BROWSER_BLOCK}__destination`}>
      <View as="dt" className={`${STORAGE_BROWSER_BLOCK}__destination-label`}>
        {label}
      </View>
      <View as="dd" className={`${STORAGE_BROWSER_BLOCK}__destination-value`}>
        <Breadcrumbs.Container>
          {items.map((item, i) => {
            return (
              <Breadcrumbs.Item key={i}>
                {isNavigable ? (
                  <Breadcrumbs.Link
                    as={item.isCurrent ? 'span' : 'button'}
                    isCurrent={item.isCurrent}
                    onClick={item.onNavigate}
                  >
                    {item.name}
                  </Breadcrumbs.Link>
                ) : (
                  item.name
                )}

                {item.isCurrent ? null : <Breadcrumbs.Separator />}
              </Breadcrumbs.Item>
            );
          })}
        </Breadcrumbs.Container>
      </View>
    </View>
  );
};

const Title: Components['Title'] = ({ title }) => {
  return <View className={`${STORAGE_BROWSER_BLOCK}__title`}>{title}</View>;
};

export const componentsDefault: Components = {
  ActionDestination,
  ActionsList,
  DataRefresh,
  LoadingIndicator,
  Pagination,
  Navigation,
  OverwriteToggle,
  SearchField,
  SearchSubfoldersToggle,
  StatusDisplay,
  FolderNameField,
  Title,
};
