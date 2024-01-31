import { TestBed } from '@angular/core/testing';

import { DataProvinsiService } from './data-provinsi.service';

describe('DataProvinsiService', () => {
  let service: DataProvinsiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataProvinsiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
