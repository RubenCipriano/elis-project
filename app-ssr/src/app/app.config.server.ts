import { mergeApplicationConfig, ApplicationConfig, REQUEST, RESPONSE_INIT } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { AuthService } from './services/auth.service';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRouting(serverRoutes),
    AuthService
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
