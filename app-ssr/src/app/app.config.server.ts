import { provideServerRendering, withRoutes } from '@angular/ssr';
import { mergeApplicationConfig, ApplicationConfig, REQUEST, RESPONSE_INIT } from '@angular/core';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { AuthService } from './services/auth.service';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(withRoutes(serverRoutes)), AuthService]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
