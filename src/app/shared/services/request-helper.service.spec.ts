import { TestBed } from '@angular/core/testing';

import { RequestHelperService } from './request-helper.service';

describe('RequestHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestHelperService = TestBed.get(RequestHelperService);
    expect(service).toBeTruthy();
  });
});
