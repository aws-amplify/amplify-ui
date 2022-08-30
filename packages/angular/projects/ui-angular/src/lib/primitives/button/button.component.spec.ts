import { ButtonComponent } from './button.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';

describe('ButtonComponent', () => {
  let fixture: ComponentFixture<ButtonComponent>;
  let component: ButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
  });
  it('Default type test.', () => {
    expect(component.type).toEqual('button');
  });
});
