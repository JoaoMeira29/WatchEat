import { TestBed } from '@angular/core/testing';

import { ReviewPremiumDataService } from './review-premium-data.service';

describe('ReviewPremiumDataService', () => {
  let service: ReviewPremiumDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewPremiumDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
