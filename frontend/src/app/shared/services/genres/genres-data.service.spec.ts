import { TestBed } from '@angular/core/testing';

import { GenresDataService } from './genres-data.service';

describe('GenresDataService', () => {
  let service: GenresDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenresDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
