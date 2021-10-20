import React from 'react';

import { CheckboxField, SelectField, TableProps } from '@aws-amplify/ui-react';
import { DemoBox } from './DemoBox';

export interface TablePropControlsProps extends TableProps {
  setHighlightOnHover: (
    value: React.SetStateAction<TableProps['highlightOnHover']>
  ) => void;
  setPagination: (
    value: React.SetStateAction<TableProps['pagination']>
  ) => void;
  setSelectable: (
    value: React.SetStateAction<TableProps['selectable']>
  ) => void;
  setSize: (value: React.SetStateAction<TableProps['size']>) => void;
  setStickyHeader: (
    value: React.SetStateAction<TableProps['stickyHeader']>
  ) => void;
  setVariation: (value: React.SetStateAction<TableProps['variation']>) => void;
}

interface TablePropControlsInterface {
  (props: TablePropControlsProps): JSX.Element;
}

export const TablePropControls: TablePropControlsInterface = ({
  highlightOnHover,
  pagination,
  selectable,
  setHighlightOnHover,
  setPagination,
  setSelectable,
  setSize,
  setStickyHeader,
  setVariation,
  size,
  stickyHeader,
  variation,
}) => {
  return (
    <DemoBox primitiveName="Table">
      <SelectField
        defaultValue={pagination}
        id="pagination"
        label="pagination"
        name="pagination"
        onChange={(event) =>
          setPagination(event.target.value as TableProps['pagination'])
        }
      >
        <option value="infinite-scroll">infinite-scroll</option>
        <option value="paginated">paginated</option>
      </SelectField>
      <SelectField
        defaultValue={size}
        id="size"
        label="size"
        name="size"
        onChange={(event) => setSize(event.target.value as TableProps['size'])}
      >
        <option value="small">small</option>
        <option value="large">large</option>
      </SelectField>
      <SelectField
        defaultValue={variation}
        id="variation"
        label="variation"
        name="variation"
        onChange={(event) =>
          setVariation(event.target.value as TableProps['variation'])
        }
      >
        <option value="bordered">bordered</option>
        <option value="striped">striped</option>
      </SelectField>
      <CheckboxField
        checked={highlightOnHover}
        name="highlight_on_hover"
        onChange={(e) =>
          setHighlightOnHover(
            e.target.checked as TableProps['highlightOnHover']
          )
        }
        value="false"
      >
        highlightOnHover
      </CheckboxField>
      <CheckboxField
        checked={selectable}
        name="selectable"
        onChange={(e) =>
          setSelectable(e.target.checked as TableProps['selectable'])
        }
        value="false"
      >
        selectable
      </CheckboxField>
      <CheckboxField
        checked={stickyHeader}
        name="sticky_header"
        onChange={(e) =>
          setStickyHeader(e.target.checked as TableProps['stickyHeader'])
        }
        value="false"
      >
        stickyHeader
      </CheckboxField>
    </DemoBox>
  );
};
