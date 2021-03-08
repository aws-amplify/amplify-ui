import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SparkContextProviderComponent } from './spark-context-provider.component';

describe('SparkContextProviderComponent', () => {
  let component: SparkContextProviderComponent;
  let fixture: ComponentFixture<SparkContextProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SparkContextProviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SparkContextProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
