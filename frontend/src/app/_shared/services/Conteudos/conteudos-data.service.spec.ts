import { TestBed } from '@angular/core/testing';
import { ConteudosDataService } from './conteudos-data.service';

describe('ConteudosDataService', () => {
  let service: ConteudosDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConteudosDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
