import { TestBed, inject } from '@angular/core/testing';

import { Ng2SignalrClientService } from './ng2-signalr-client.service';

describe('Ng2SignalrClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Ng2SignalrClientService]
    });
  });

  it('should be created', inject([Ng2SignalrClientService], (service: Ng2SignalrClientService) => {
    expect(service).toBeTruthy();
  }));
});
