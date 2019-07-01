import { TestBed } from '@angular/core/testing';

import { PlatilloService } from './platillo.service';

describe('PlatilloService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlatilloService = TestBed.get(PlatilloService);
    expect(service).toBeTruthy();
  });
});
