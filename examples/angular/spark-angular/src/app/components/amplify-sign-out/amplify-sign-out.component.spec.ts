import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmplifySignOutComponent } from './amplify-sign-out.component';

describe('AmplifySignOutComponent', () => {
  let component: AmplifySignOutComponent;
  let fixture: ComponentFixture<AmplifySignOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmplifySignOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmplifySignOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
