import { TestBed } from '@angular/core/testing';
import { KnoraService } from './knora.service';

describe('KnoraService', () => {
  let service: KnoraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KnoraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
