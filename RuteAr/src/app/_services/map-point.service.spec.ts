import { TestBed, inject } from '@angular/core/testing';

import { MapPointService } from './map-point.service';

describe('MapPointService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapPointService]
    });
  });

  it('should be created', inject([MapPointService], (service: MapPointService) => {
    expect(service).toBeTruthy();
  }));
});
