import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SparkAngularComponent } from './spark-angular.component';

describe('SparkAngularComponent', () => {
  let component: SparkAngularComponent;
  let fixture: ComponentFixture<SparkAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SparkAngularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SparkAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
