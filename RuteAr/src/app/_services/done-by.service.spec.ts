import { TestBed, inject } from '@angular/core/testing';

import { DoneByService } from './done-by.service';

describe('DoneByService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DoneByService]
    });
  });

  it('should be created', inject([DoneByService], (service: DoneByService) => {
    expect(service).toBeTruthy();
  }));
});
