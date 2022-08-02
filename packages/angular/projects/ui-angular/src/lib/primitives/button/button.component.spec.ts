import { ButtonComponent } from './button.component';

describe('AppComponent', () => {
  let fixture: ButtonComponent;

  beforeEach(() => {
    fixture = new ButtonComponent();
  });
  it('Default type test.', () => {
    expect(fixture.type).toEqual('button');
  });
});
