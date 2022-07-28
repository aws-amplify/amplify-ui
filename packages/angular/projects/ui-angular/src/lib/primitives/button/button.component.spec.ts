import { ButtonComponent } from './button.component';

describe('AppComponent', () => {
  let fixture: ButtonComponent;

  beforeEach(() => {
    fixture = new ButtonComponent();
  });
  it('App component test', () => {
    expect(fixture.title).toEqual('Test Check');
  });
});
