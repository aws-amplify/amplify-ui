import * as React from 'react';
import {
  Accordion,
  Card,
  Grid,
  GridContainerStyleProps,
  GridItemStyleProps,
  useTheme,
} from '@aws-amplify/ui-react';

import { Demo } from '@/components/Demo';
import { demoState } from '@/utils/demoState';
import { GridContainerPropControls } from './GridContainerPropControls';
import {
  GridItemPropControls,
  GridItemPropControlsProps,
} from './GridItemPropControls';
import { useGridItemProps } from './useGridItemProps';
import { useGridContainerProps } from './useGridContainerProps';
import { getPropString } from '../utils/getPropString';

const propsToHeaderGridItemCode = (props: GridItemPropControlsProps) => {
  return (
    '<Card' +
    getPropString(props.columnStart, 'columnStart', 4) +
    getPropString(props.columnEnd, 'columnEnd', 4) +
    getPropString(props.rowStart, 'rowStart', 4) +
    getPropString(props.rowEnd, 'rowEnd', 4) +
    '\n  >' +
    '\n    Header' +
    '\n  </Card>'
  );
};

const propsToNavGridItemCode = (props: GridItemPropControlsProps) => {
  return (
    '<Card' +
    getPropString(props.columnStart, 'columnStart', 4) +
    getPropString(props.columnEnd, 'columnEnd', 4) +
    getPropString(props.rowStart, 'rowStart', 4) +
    getPropString(props.rowEnd, 'rowEnd', 4) +
    '\n  >' +
    '\n    Nav' +
    '\n  </Card>'
  );
};

const propsToMainGridItemCode = (props: GridItemPropControlsProps) => {
  return (
    '<Card' +
    getPropString(props.columnStart, 'columnStart', 4) +
    getPropString(props.columnEnd, 'columnEnd', 4) +
    getPropString(props.rowStart, 'rowStart', 4) +
    getPropString(props.rowEnd, 'rowEnd', 4) +
    '\n  >' +
    '\n    Main' +
    '\n  </Card>'
  );
};

const propsToFooterGridItemCode = (props: GridItemPropControlsProps) => {
  return (
    '<Card' +
    getPropString(props.columnStart, 'columnStart', 4) +
    getPropString(props.columnEnd, 'columnEnd', 4) +
    getPropString(props.rowStart, 'rowStart', 4) +
    getPropString(props.rowEnd, 'rowEnd', 4) +
    '\n  >' +
    '\n    Footer' +
    '\n  </Card>'
  );
};

const propsToCode = (props: GridContainerStyleProps, children: string) => {
  return (
    '<Grid' +
    getPropString(props.autoFlow, 'autoFlow') +
    getPropString(props.autoColumns, 'autoColumns') +
    getPropString(props.autoRows, 'autoRows') +
    getPropString(props.gap, 'gap') +
    getPropString(props.columnGap, 'columnGap') +
    getPropString(props.rowGap, 'rowGap') +
    getPropString(props.templateAreas, 'templateAreas') +
    getPropString(props.templateColumns, 'templateColumns') +
    getPropString(props.templateRows, 'templateRows') +
    getPropString(props.alignItems, 'alignItems') +
    getPropString(props.alignContent, 'alignContent') +
    getPropString(props.justifyContent, 'justifyContent') +
    '\n>' +
    children +
    '\n</Grid>'
  );
};

const defaultGridContainerStyleProps: GridContainerStyleProps = {
  alignContent: '',
  alignItems: '',
  autoColumns: '',
  autoFlow: '',
  autoRows: '',
  columnGap: '0.5rem',
  gap: '',
  justifyContent: '',
  rowGap: '0.5rem',
  templateColumns: '1fr 1fr 1fr',
  templateRows: '1fr 3fr 1fr',
};

const defaultHeaderGridItemStyleProps: GridItemStyleProps = {
  columnStart: '1',
  columnEnd: '-1',
  rowStart: '',
  rowEnd: '',
};

const defaultFooterGridItemStyleProps: GridItemStyleProps = {
  ...defaultHeaderGridItemStyleProps,
  columnStart: '2',
  columnEnd: '-1',
};
const defaultNavGridItemStyleProps: GridItemStyleProps = {
  ...defaultHeaderGridItemStyleProps,
  columnStart: '1',
  columnEnd: '2',
  rowSpan: 2,
};
const defaultMainGridItemStyleProps: GridItemStyleProps = {
  ...defaultHeaderGridItemStyleProps,
  columnStart: '2',
  columnEnd: '-1',
};

export const GridDemo = () => {
  const theme = useTheme();
  const gridContainerProps = useGridContainerProps(
    demoState.get('GridContainer') || defaultGridContainerStyleProps
  );
  const headerGridItemProps = useGridItemProps(
    demoState.get('GridItemHeader') || {
      ...defaultHeaderGridItemStyleProps,
      name: 'GridItemHeader',
    }
  );
  const footerGridItemProps = useGridItemProps(
    demoState.get('GridItemFooter') || {
      ...defaultFooterGridItemStyleProps,
      name: 'GridItemFooter',
    }
  );
  const navGridItemProps = useGridItemProps(
    demoState.get('GridItemNav') || {
      ...defaultNavGridItemStyleProps,
      name: 'GridItemNav',
    }
  );
  const mainGridItemProps = useGridItemProps(
    demoState.get('GridItemMain') || {
      ...defaultMainGridItemStyleProps,
      name: 'GridItemMain',
    }
  );
  // To retain expanded items between light and dark mode
  const [value, setValue] = React.useState<string[]>(
    (demoState.get('GridDemoExpandedItems') as string[]) || ['']
  );
  const handleExpandChange = React.useCallback((value: string[]) => {
    demoState.set('GridDemoExpandedItems', value);
    setValue(value);
  }, []);

  const gridItemsCode =
    `\n  ${propsToHeaderGridItemCode(headerGridItemProps)}` +
    `\n  ${propsToNavGridItemCode(navGridItemProps)}` +
    `\n  ${propsToMainGridItemCode(mainGridItemProps)}` +
    `\n  ${propsToFooterGridItemCode(footerGridItemProps)}`;

  return (
    <Demo
      code={propsToCode(gridContainerProps, gridItemsCode)}
      propControls={
        <>
          <Accordion value={value} onChange={handleExpandChange}>
            <Accordion.Item value="item-1">
              <Accordion.Trigger>
                Grid container props
                <Accordion.Icon />
              </Accordion.Trigger>
              <Accordion.Content>
                <GridContainerPropControls {...gridContainerProps} />
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="item-2">
              <Accordion.Trigger>
                Grid item (Header) props
                <Accordion.Icon />
              </Accordion.Trigger>
              <Accordion.Content>
                <GridItemPropControls {...headerGridItemProps} />
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="item-3">
              <Accordion.Trigger>
                Grid item (Nav) props
                <Accordion.Icon />
              </Accordion.Trigger>
              <Accordion.Content>
                <GridItemPropControls {...navGridItemProps} />
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="item-4">
              <Accordion.Trigger>
                Grid item (Main) props
                <Accordion.Icon />
              </Accordion.Trigger>
              <Accordion.Content>
                <GridItemPropControls {...mainGridItemProps} />
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="item-5">
              <Accordion.Trigger>
                Grid item (Footer) props
                <Accordion.Icon />
              </Accordion.Trigger>
              <Accordion.Content>
                <GridItemPropControls {...footerGridItemProps} />
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>
        </>
      }
    >
      <Grid
        alignContent={gridContainerProps.alignContent}
        alignItems={gridContainerProps.alignItems}
        autoColumns={gridContainerProps.autoColumns}
        autoRows={gridContainerProps.autoRows}
        columnGap={gridContainerProps.columnGap}
        gap={gridContainerProps.gap}
        rowGap={gridContainerProps.rowGap}
        templateAreas={gridContainerProps.templateAreas}
        templateColumns={gridContainerProps.templateColumns}
        templateRows={gridContainerProps.templateRows}
        justifyContent={gridContainerProps.justifyContent}
      >
        <Card
          backgroundColor={`${theme.tokens.colors.blue[10]}`}
          area={headerGridItemProps.area}
          column={headerGridItemProps.column}
          columnEnd={headerGridItemProps.columnEnd}
          columnSpan={headerGridItemProps.columnSpan}
          columnStart={headerGridItemProps.columnStart}
          row={headerGridItemProps.row}
          rowEnd={headerGridItemProps.rowEnd}
          rowStart={headerGridItemProps.rowStart}
          rowSpan={headerGridItemProps.rowSpan}
        >
          Header
        </Card>
        <Card
          backgroundColor={`${theme.tokens.colors.yellow[10]}`}
          area={navGridItemProps.area}
          column={navGridItemProps.column}
          columnEnd={navGridItemProps.columnEnd}
          columnSpan={navGridItemProps.columnSpan}
          columnStart={navGridItemProps.columnStart}
          row={navGridItemProps.row}
          rowEnd={navGridItemProps.rowEnd}
          rowStart={navGridItemProps.rowStart}
          rowSpan={navGridItemProps.rowSpan}
        >
          Nav
        </Card>
        <Card
          backgroundColor={`${theme.tokens.colors.green[10]}`}
          area={mainGridItemProps.area}
          column={mainGridItemProps.column}
          columnEnd={mainGridItemProps.columnEnd}
          columnSpan={mainGridItemProps.columnSpan}
          columnStart={mainGridItemProps.columnStart}
          row={mainGridItemProps.row}
          rowEnd={mainGridItemProps.rowEnd}
          rowStart={mainGridItemProps.rowStart}
          rowSpan={mainGridItemProps.rowSpan}
        >
          Main
        </Card>
        <Card
          backgroundColor={`${theme.tokens.colors.red[10]}`}
          area={footerGridItemProps.area}
          column={footerGridItemProps.column}
          columnEnd={footerGridItemProps.columnEnd}
          columnSpan={footerGridItemProps.columnSpan}
          columnStart={footerGridItemProps.columnStart}
          row={footerGridItemProps.row}
          rowEnd={footerGridItemProps.rowEnd}
          rowStart={footerGridItemProps.rowStart}
          rowSpan={footerGridItemProps.rowSpan}
        >
          Footer
        </Card>
      </Grid>
    </Demo>
  );
};
