import { TestBed } from '@angular/core/testing';

import { SparkAngularService } from './spark-angular.service';

describe('SparkAngularService', () => {
  let service: SparkAngularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SparkAngularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
