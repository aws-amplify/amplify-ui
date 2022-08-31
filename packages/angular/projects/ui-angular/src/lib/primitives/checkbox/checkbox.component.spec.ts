import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let fixture: CheckboxComponent;

  beforeEach(() => {
    fixture = new CheckboxComponent();
  });
  it('has a default isChecked value of false', () => {
    expect(fixture.isChecked).toEqual(false);
  });
});
