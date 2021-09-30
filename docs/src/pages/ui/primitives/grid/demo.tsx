import React, { useState } from 'react';
import {
  Card,
  Grid,
  GridContainerStyleProps,
  GridItemStyleProps,
  useTheming,
  View,
} from '@aws-amplify/ui-react';
import { useGridContainerProps } from '@/components/useGridContainerProps';
import { Example } from '@/components/Example';
import { GridContainerPropControls } from '@/components/GridContainerPropControls';
import { GridItemPropControls } from '@/components/GridItemPropControls';
import { useGridItemProps } from '@/components/useGridItemProps';

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
  const { theme } = useTheming();
  const gridContainerProps = useGridContainerProps(
    defaultGridContainerStyleProps
  );
  const headerGridItemProps = useGridItemProps(defaultHeaderGridItemStyleProps);
  const footerGridItemProps = useGridItemProps(defaultFooterGridItemStyleProps);
  const navGridItemProps = useGridItemProps(defaultNavGridItemStyleProps);
  const mainGridItemProps = useGridItemProps(defaultMainGridItemStyleProps);

  return (
    <View>
      <GridContainerPropControls {...gridContainerProps} />
      <GridItemPropControls
        primitiveName="Grid item (Header)"
        {...headerGridItemProps}
      />
      <GridItemPropControls
        primitiveName="Grid item (Nav)"
        {...navGridItemProps}
      />
      <GridItemPropControls
        primitiveName="Grid item (Main)"
        {...mainGridItemProps}
      />
      <GridItemPropControls
        primitiveName="Grid item (Footer)"
        {...footerGridItemProps}
      />

      <Example>
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
            backgroundColor={theme.colors.blue[10]}
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
            backgroundColor={theme.colors.yellow[10]}
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
            backgroundColor={theme.colors.green[10]}
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
            backgroundColor={theme.colors.red[10]}
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
      </Example>
    </View>
  );
};
