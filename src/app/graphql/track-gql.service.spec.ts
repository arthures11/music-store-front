import { TestBed } from '@angular/core/testing';

import { TrackGqlService } from './track-gql.service';

describe('TrackGqlService', () => {
  let service: TrackGqlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackGqlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
