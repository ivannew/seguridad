import { TestBed } from '@angular/core/testing';

import { ServiciosloginService } from './servicioslogin.service';

describe('ServiciosloginService', () => {
  let service: ServiciosloginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciosloginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
