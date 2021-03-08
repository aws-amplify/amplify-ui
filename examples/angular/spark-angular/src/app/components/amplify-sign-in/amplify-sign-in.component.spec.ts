import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmplifySignInComponent } from './amplify-sign-in.component';

describe('AmplifySignInComponent', () => {
  let component: AmplifySignInComponent;
  let fixture: ComponentFixture<AmplifySignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmplifySignInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmplifySignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
