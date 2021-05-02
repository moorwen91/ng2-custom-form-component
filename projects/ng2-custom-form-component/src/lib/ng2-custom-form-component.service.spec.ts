import { TestBed } from '@angular/core/testing';

import { Ng2CustomFormComponentService } from './ng2-custom-form-component.service';

describe('Ng2CustomFormComponentService', () => {
  let service: Ng2CustomFormComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ng2CustomFormComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
