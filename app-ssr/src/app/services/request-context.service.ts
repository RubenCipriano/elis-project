import { Injectable, Inject, PLATFORM_ID, Optional, REQUEST, REQUEST_CONTEXT } from '@angular/core';
import { RequestContext } from '../interfaces/request-context.interface';

@Injectable({
  providedIn: 'root',
})

export class RequestContextService {

  constructor(@Inject(REQUEST_CONTEXT) private requestContext: RequestContext) {}

  grabFromContext(provideName: string) {
    return this.requestContext.providers.find(p => p.provide == provideName)?.useValue;
  }
}
