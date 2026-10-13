import { TestBed } from '@angular/core/testing';

import { PremiumReviewsDataService } from './premium-reviews-data.service';

describe('PremiumReviewsDataService', () => {
  let service: PremiumReviewsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PremiumReviewsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
