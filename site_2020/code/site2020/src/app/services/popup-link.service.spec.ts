import { TestBed } from '@angular/core/testing';
import { PopupLinkService } from './popup-link.service';

describe('PopupLinkService', () => {
  let service: PopupLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopupLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
