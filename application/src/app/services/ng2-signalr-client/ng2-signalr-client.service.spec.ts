/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Ng2SignalrClientService } from './ng2-signalr-client.service';

describe('Service: Ng2SignalrClient', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Ng2SignalrClientService]
    });
  });

  it('should ...', inject([Ng2SignalrClientService], (service: Ng2SignalrClientService) => {
    expect(service).toBeTruthy();
  }));
});