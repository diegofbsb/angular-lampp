import { TestBed } from '@angular/core/testing';

import { PessoaserviceService } from './pessoaservice.service';

describe('PessoaserviceService', () => {
  let service: PessoaserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PessoaserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
