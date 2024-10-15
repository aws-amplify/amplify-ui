import React, { useState, useEffect, useRef } from 'react';
import { useAction } from '../../context/actions';
import { isString } from '@aws-amplify/ui';
import { Paginate } from '../../components/Paginate';
import { LoadingControl } from '../Controls/Loading';
import { usePaginate } from '../hooks/usePaginate';
import { useControl } from '../../context/control';
import { NavigateItem } from '../Controls';

import { StorageBrowserElements } from '../../context/elements';

const { Button } = StorageBrowserElements;

export const DEFAULT_ERROR_MESSAGE = 'There was an error loading items.';
const DEFAULT_PAGE_SIZE = 100;
export const DEFAULT_LIST_OPTIONS = {
  pageSize: DEFAULT_PAGE_SIZE,
  delimiter: '/',
};

const DEFAULT_REFRESH_OPTIONS = { ...DEFAULT_LIST_OPTIONS, refresh: true };

export const DestinationPicker = (): React.JSX.Element => {
  const [state] = useControl('NAVIGATE');
  const { path: rootPath } = state;

  const [path, setPath] = useState([rootPath]);
  const previousPathref = useRef('');

  const [{ data, isLoading }, handleList] = useAction('LIST_LOCATION_ITEMS');
  const { result, nextToken } = data;

  const folderItems = result.filter((item) => item.type === 'FOLDER');
  const resultCount = folderItems.length;
  const hasNextToken = !!nextToken;

  // TODO: move to hook:
  const disableNext = false;
  const disablePrevious = false;

  const hasValidPath = isString(path);
  const onPaginateNext = () => {
    if (!hasValidPath) return;

    // TODO: clear radio selection
    // handleLocationActionsState({ type: 'CLEAR' });
    handleList({
      prefix: path,
      options: { ...DEFAULT_LIST_OPTIONS, nextToken },
    });
  };

  const onPaginatePrevious = () => {
    if (!hasValidPath) return;

    // TODO: clear radio selection
  };

  const { currentPage, handlePaginateNext, handlePaginatePrevious } =
    usePaginate({
      onPaginateNext,
      onPaginatePrevious,
      pageSize: DEFAULT_PAGE_SIZE,
    });

  useEffect(() => {
    const newPath = path.join('');
    if (previousPathref.current !== newPath) {
      handleList({
        prefix: newPath,
        options: { ...DEFAULT_REFRESH_OPTIONS, nextToken },
      });
    }
    previousPathref.current = newPath;
  }, [handleList, nextToken, path]);

  const handleNavigateFolder = (key: string) => {
    const newPath = [...path, key];
    setPath(newPath);
  };

  const handleNavigatePath = (index: number) => {
    const newPath = path.slice(0, index + 1);
    setPath(newPath);
  };

  // const handleNavigateUpLevel = () => {
  //   const newPath = path.slice(0, -1);
  //   setPath(newPath);
  //   setCheckedPath(newPath.join(''));
  // };

  if (isLoading) {
    return <LoadingControl />;
  }
  return (
    <div>
      <div
        style={{
          display: 'flex',
          gap: '1px',
        }}
      >
        Set destination:{' '}
        {path.length ? (
          <>
            {path.map((item, index) => (
              <NavigateItem
                isCurrent={index === path.length - 1}
                key={`${item}-${index}`}
                onClick={() => handleNavigatePath(index)}
              >
                {item?.replace('/', '')}
              </NavigateItem>
            ))}
          </>
        ) : (
          '-'
        )}
      </div>
      <Paginate
        currentPage={currentPage}
        disableNext={disableNext}
        disablePrevious={disablePrevious}
        handleNext={() => {
          handlePaginateNext({ resultCount, hasNextToken });
        }}
        handlePrevious={handlePaginatePrevious}
      />
      <ul>
        {folderItems.length
          ? folderItems.map((i) => (
              <li key={i.key} style={{ display: 'flex' }}>
                <Button
                  variant="table-data"
                  onClick={() => handleNavigateFolder(i.key)}
                >
                  {i.key}
                </Button>
              </li>
            ))
          : 'Current folder selected'}
      </ul>
    </div>
  );
};
