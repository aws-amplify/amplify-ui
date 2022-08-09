import { render, screen, fireEvent } from '@testing-library/angular';
import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  test('should render counter', async () => {
    await render(CheckboxComponent, {
      componentProperties: { isChecked: true },
    });

    //expect(screen.getByText(false)).toBeInTheDocument()
  });
});
