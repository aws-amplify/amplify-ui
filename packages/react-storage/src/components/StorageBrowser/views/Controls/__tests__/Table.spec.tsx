import React from 'react';
import { render } from '@testing-library/react';

import { LocationItem } from '../../../do-not-import-from-here/types';

import { Column, TableControl } from '../Table';

const locationItems: LocationItem[] = [
  {
    key: 'test-key-1',
    lastModified: new Date(),
    size: 1000,
    type: 'FILE',
  },
  {
    key: 'test-key-2',
    lastModified: new Date(),
    size: 1000,
    type: 'FILE',
  },
  {
    key: 'test-key-3',
    lastModified: new Date(),
    size: 1000,
    type: 'FILE',
  },
  {
    key: 'test-folder-key-1',
    type: 'FOLDER',
  },
];

describe('TableControl', () => {
  it('calls renderHeaderItem and renderRowItem to render the TableControl', () => {
    const renderHeaderItemSpy = jest.fn();
    const renderRowItemSpy = jest.fn();

    const columns: Column<LocationItem>[] = [
      {
        header: 'Name',
        key: 'key',
      },
      {
        header: 'Type',
        key: 'type',
      },
    ];

    render(
      <TableControl
        data={locationItems}
        columns={columns}
        renderHeaderItem={renderHeaderItemSpy}
        renderRowItem={renderRowItemSpy}
      />
    );

    expect(renderHeaderItemSpy).toHaveBeenCalled();
    expect(renderRowItemSpy).toHaveBeenCalled();
  });
});
