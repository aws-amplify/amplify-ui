import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { Placeholder } from '../Placeholder';
import { Text } from '../../Text';
import { ComponentClassNames } from '../../shared';

describe('Placeholder: ', () => {
  it('renders correct defaults', async () => {
    render(<Placeholder testId="placeholderId" />);

    const placeholder = await screen.findByTestId('placeholderId');
    expect(
      placeholder.classList.contains(ComponentClassNames.Placeholder)
    ).toBe(true);
    expect(placeholder.dataset['size']).toBe('medium');
  });

  it('renders based on isLoaded prop', async () => {
    render(
      <div>
        <Placeholder testId="p1">
          <Text testId="t1">Should not render</Text>
        </Placeholder>
        <Placeholder isLoaded={true} testId="p2">
          <Text testId="t2">Should render</Text>
        </Placeholder>
      </div>
    );

    const p1 = await screen.queryByTestId('p1');
    const t1 = await screen.queryByTestId('t1');
    const p2 = await screen.queryByTestId('p2');
    const t2 = await screen.queryByTestId('t2');

    expect(p1).toBeTruthy();
    expect(t1).toBeNull();
    expect(p2).toBeNull();
    expect(t2).toBeTruthy();
  });

  it('renders conditionally', async () => {
    const isLoaded = false;
    render(
      <div>
        {isLoaded ? (
          <Text testId="t1">Should not render</Text>
        ) : (
          <Placeholder testId="p1" />
        )}
        {!isLoaded ? (
          <Text testId="t2">Should render</Text>
        ) : (
          <Placeholder testId="p2" />
        )}
      </div>
    );

    const p1 = await screen.queryByTestId('p1');
    const t1 = await screen.queryByTestId('t1');
    const p2 = await screen.queryByTestId('p2');
    const t2 = await screen.queryByTestId('t2');

    expect(p1).toBeTruthy();
    expect(t1).toBeNull();
    expect(p2).toBeNull();
    expect(t2).toBeTruthy();
  });

  it('renders different sizes by passing size prop', async () => {
    render(
      <div>
        <Placeholder size="small" testId="p1" />
        <Placeholder size="medium" testId="p2" />
        <Placeholder size="large" testId="p3" />
      </div>
    );

    const p1 = await screen.findByTestId('p1');
    const p2 = await screen.findByTestId('p2');
    const p3 = await screen.findByTestId('p3');

    expect(p1.dataset['size']).toBe('small');
    expect(p2.dataset['size']).toBe('medium');
    expect(p3.dataset['size']).toBe('large');
  });

  it('can apply styling via props', async () => {
    render(<Placeholder height="123px" width="50%" testId="placeholderId" />);
    const placeholder = await screen.findByTestId('placeholderId');
    expect(placeholder.style.getPropertyValue('height')).toBe('123px');
    expect(placeholder.style.getPropertyValue('width')).toBe('50%');
  });

  it('can apply a custom className', async () => {
    render(
      <Placeholder className="custom-placeholder" testId="placeholderId" />
    );
    const placeholder = await screen.findByTestId('placeholderId');
    expect(placeholder.classList.contains('custom-placeholder')).toBe(true);
    expect(
      placeholder.classList.contains(ComponentClassNames.Placeholder)
    ).toBe(true);
  });

  it('can render any arbitrary data-* attribute', async () => {
    render(<Placeholder data-demo="true" testId="dataTest" />);
    const heading = await screen.findByTestId('dataTest');
    expect(heading.dataset['demo']).toBe('true');
  });
});
