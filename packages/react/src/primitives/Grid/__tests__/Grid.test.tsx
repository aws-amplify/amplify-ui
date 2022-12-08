import * as React from 'react';
import { render, screen } from '@testing-library/react';
import kebabCase from 'lodash/kebabCase';

import { Grid } from '../Grid';
import { View } from '../../View';
import { Card } from '../../Card';

import {
  ComponentPropsToStylePropsMap,
  GridContainerStyleProps,
  GridItemStyleProps,
} from '../../types';
import { ComponentClassNames } from '../../shared/constants';
import { errorMessageWrapper } from '../../utils/testUtils';
import { convertGridSpan } from '../../shared/styleUtils';

export const testGridItemStyleProps: GridItemStyleProps = {
  area: '1 / 1 / 2 / 2',
  column: '1 / span 2',
  columnEnd: 'auto',
  // columnSpan: 3, // Left out to test separately below, since this changes the row property
  columnStart: '1',
  row: '2 / span',
  rowEnd: '3',
  // rowSpan: 2, // Left out to test separately below, since this changes the row property
  rowStart: '1',
};

export const testGridContainerStyleProps: GridContainerStyleProps = {
  alignContent: 'center',
  alignItems: 'center',
  autoColumns: '1fr',
  autoFlow: 'row dense',
  autoRows: 'minmax(30px, auto)',
  columnGap: '1rem',
  gap: '2rem',
  justifyContent: 'space-between',
  rowGap: '3rem',
  templateAreas: `"a a a" "b c c" " b c c"`,
  templateColumns: '1fr 2fr',
  templateRows: '2fr 1fr',
};

export const expectGridContainerStyleProps = (element: HTMLElement): void => {
  Object.keys(testGridContainerStyleProps).forEach((key) => {
    errorMessageWrapper(
      () =>
        expect(
          element.style.getPropertyValue(
            kebabCase(ComponentPropsToStylePropsMap[key])
          )
        ).toBe(testGridContainerStyleProps[key]),
      `Grid container "${key}" style prop error (see above)`
    );
  });
};

export function expectGridItemStyleProps(element: HTMLElement): void {
  Object.keys(testGridItemStyleProps).forEach((key) => {
    errorMessageWrapper(
      () =>
        expect(
          element.style.getPropertyValue(
            kebabCase(ComponentPropsToStylePropsMap[key])
          )
        ).toBe(testGridItemStyleProps[key]),
      `Grid item ${key} style prop error (see above)`
    );
  });
}

describe('Grid: ', () => {
  const testId = 'gridPrimitive';
  const itemTestId = 'gridItem';

  it('can apply Grid container styling via style prop', async () => {
    render(<Grid testId={testId} {...testGridContainerStyleProps}></Grid>);

    const grid = await screen.findByTestId(testId);
    expectGridContainerStyleProps(grid);
  });

  it('has default class and can apply a custom className', async () => {
    render(<Grid testId={testId} className="custom-grid"></Grid>);
    const grid = await screen.findByTestId(testId);
    expect(grid).toHaveClass('custom-grid');
    expect(grid).toHaveClass(ComponentClassNames.Grid);
  });

  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Grid ref={ref} testId={testId}></Grid>);
    await screen.findByTestId(testId);
    expect(ref.current.nodeName).toBe('DIV');
  });

  it('can render any arbitrary data-* attribute', async () => {
    render(<Grid data-demo="true" testId={testId}></Grid>);
    const view = await screen.findByTestId(testId);
    expect(view.dataset['demo']).toBe('true');
  });

  describe('Grid items: ', () => {
    const cardTestId = `${itemTestId}-card`;

    it('can apply Grid item styling via style prop', async () => {
      const viewTestId = `${itemTestId}-view`;
      const cardTestId = `${itemTestId}-card`;

      render(
        <Grid testId={testId}>
          <View testId={viewTestId} {...testGridItemStyleProps}>
            1
          </View>
          <Card testId={cardTestId} {...testGridItemStyleProps}>
            2
          </Card>
        </Grid>
      );

      const view = await screen.findByTestId(viewTestId);
      const card = await screen.findByTestId(cardTestId);

      expectGridItemStyleProps(view);
      expectGridItemStyleProps(card);
    });

    it('rowSpan and columnSpan can set row and column values', async () => {
      const { row, column, ...rest } = testGridItemStyleProps;
      const styleProps = {
        ...rest,
        columnSpan: 2,
        rowSpan: 4,
      };

      render(
        <Card testId={cardTestId} {...styleProps}>
          2
        </Card>
      );

      const card = await screen.findByTestId(cardTestId);

      expect(
        card.style.getPropertyValue(
          kebabCase(ComponentPropsToStylePropsMap.row)
        )
      ).toBe(convertGridSpan(styleProps.rowSpan));
      expect(
        card.style.getPropertyValue(
          kebabCase(ComponentPropsToStylePropsMap.column)
        )
      ).toBe(convertGridSpan(styleProps.columnSpan));
    });

    it('rowSpan and columnSpan are overwritten by row and column values', async () => {
      const styleProps = {
        ...testGridItemStyleProps,
        columnSpan: 2,
        rowSpan: 4,
      };
      render(
        <Card testId={cardTestId} {...styleProps}>
          2
        </Card>
      );
      const card = await screen.findByTestId(cardTestId);

      expect(
        card.style.getPropertyValue(
          kebabCase(ComponentPropsToStylePropsMap.row)
        )
      ).toBe(styleProps.row);
      expect(
        card.style.getPropertyValue(
          kebabCase(ComponentPropsToStylePropsMap.column)
        )
      ).toBe(styleProps.column);
    });
  });
});
