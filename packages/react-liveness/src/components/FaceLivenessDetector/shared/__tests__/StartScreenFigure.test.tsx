import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { StartScreenFigure } from '../StartScreenFigure';
import { LivenessClassNames } from '../../types/classNames';

describe('StartScreenFigure', () => {
  const figureContent = 'Figure content';
  const caption = 'Caption content';
  it('should render the caption and children content appropriately', () => {
    render(
      <StartScreenFigure caption={caption}>{figureContent}</StartScreenFigure>
    );

    expect(screen.getByText(figureContent)).toBeInTheDocument();
    expect(screen.getByText(caption)).toBeInTheDocument();
  });

  it('should render the figure variations appropriately', async () => {
    render(
      <div>
        <StartScreenFigure testId="defaultFigure" caption={caption}>
          {figureContent}
        </StartScreenFigure>
        <StartScreenFigure
          testId="errorFigure"
          caption={caption}
          variation="error"
        >
          {figureContent}
        </StartScreenFigure>
        <StartScreenFigure
          testId="successFigure"
          caption={caption}
          variation="success"
        >
          {figureContent}
        </StartScreenFigure>
      </div>
    );

    const defaultFigure = await screen.findByTestId('defaultFigure');
    const successFigure = await screen.findByTestId('successFigure');
    const errorFigure = await screen.findByTestId('errorFigure');

    expect(defaultFigure.classList).toContain(
      `${LivenessClassNames.Figure}--default`
    );
    expect(errorFigure.classList).toContain(
      `${LivenessClassNames.Figure}--error`
    );
    expect(successFigure.classList).toContain(
      `${LivenessClassNames.Figure}--success`
    );
  });
});
