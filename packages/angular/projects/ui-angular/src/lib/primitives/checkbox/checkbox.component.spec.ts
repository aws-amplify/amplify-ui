import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let fixture: CheckboxComponent;

  beforeEach(() => {
    fixture = new CheckboxComponent();
  });
  it('Default checkbox behaviour -> ', () => {
    expect(fixture.isChecked).toEqual(false);
  });
});
