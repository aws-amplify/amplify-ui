import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Fieldset } from '../Fieldset';

import { ComponentClassNames } from '../../shared';

describe('Fieldset', () => {
  it('should render Fieldset variations', async () => {
    render(
      <div>
        <Fieldset legend="Outlined" testId="outlined">
          Outlined (default)
        </Fieldset>
        <Fieldset legend="Plain" variation="plain" testId="plain">
          Plain
        </Fieldset>
      </div>
    );
    const outlined = await screen.findByTestId('outlined');
    const plain = await screen.findByTestId('plain');

    expect(outlined.classList).toContain(
      `${ComponentClassNames.Fieldset}--outlined`
    );
    expect(plain.classList).toContain(`${ComponentClassNames.Fieldset}--plain`);
  });

  it('should forward ref to fieldset DOM element', async () => {
    const ref = React.createRef<HTMLFieldSetElement>();
    const fieldsetText = 'fieldset content';
    const testId = 'fieldsetWithRef';

    render(
      <Fieldset ref={ref} legend="Legend" testId={testId}>
        {fieldsetText}
      </Fieldset>
    );

    await screen.findByTestId(testId);
    expect(ref.current?.nodeName).toBe('FIELDSET');
    expect(ref.current?.innerHTML).toContain(fieldsetText);
  });

  it('should render classname and custom classname', async () => {
    const testId = 'customClassFieldset';
    const className = 'test-class';
    render(<Fieldset className={className} legend="Legend" testId={testId} />);

    const fieldset = await screen.findByTestId(testId);
    expect(fieldset).toHaveClass(ComponentClassNames.Fieldset, className);
  });

  it('should render fieldset sizes', async () => {
    render(
      <div>
        <Fieldset size="small" legend="Legend" testId="small" />
        <Fieldset size="large" legend="Legend" testId="large" />
      </div>
    );

    const small = await screen.findByTestId('small');
    const large = await screen.findByTestId('large');

    expect(small.classList).toContain(`${ComponentClassNames.Fieldset}--small`);
    expect(large.classList).toContain(`${ComponentClassNames.Fieldset}--large`);
  });
});
