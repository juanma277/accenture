import { TestBed } from '@angular/core/testing';

import { VotacionesService } from './votaciones.service';

describe('VotacionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VotacionesService = TestBed.get(VotacionesService);
    expect(service).toBeTruthy();
  });
});
