import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmplifyAuthenticatorComponent } from './amplify-authenticator.component';

describe('AmplifyAuthenticatorComponent', () => {
  let component: AmplifyAuthenticatorComponent;
  let fixture: ComponentFixture<AmplifyAuthenticatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmplifyAuthenticatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmplifyAuthenticatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
