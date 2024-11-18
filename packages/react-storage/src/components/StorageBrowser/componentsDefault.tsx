import * as React from 'react';
import {
  Breadcrumbs,
  TextField,
  SearchField as AmplifySearchField,
  Pagination as AmplifyPagination,
  Loader,
  CheckboxField,
} from '@aws-amplify/ui-react';
import { Components } from './ComponentsProvider';

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
    return <Loader variation="linear" size="small" />;
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

export const componentsDefault: Components = {
  LoadingIndicator,
  Pagination,
  Navigation,
  OverwriteToggle,
  SearchField,
  SearchSubfoldersToggle,
  FolderNameField,
};
