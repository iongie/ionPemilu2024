import { TestBed } from '@angular/core/testing';

import { DashboardFilterDataService } from './dashboard-filter-data.service';

describe('DashboardFilterDataService', () => {
  let service: DashboardFilterDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardFilterDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
