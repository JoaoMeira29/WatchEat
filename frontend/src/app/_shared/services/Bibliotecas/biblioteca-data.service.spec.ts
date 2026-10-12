import { TestBed } from '@angular/core/testing';

import { BibliotecaDataService } from './biblioteca-data.service';

describe('BibliotecaDataService', () => {
  let service: BibliotecaDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BibliotecaDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
