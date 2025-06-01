import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import connectDB from './back-end/config/db';
import authRoutes from './back-end/routes/authRoute';
import userRoutes from './back-end/routes/userRoute';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { driverMap, setupDriverSockets } from './back-end/socket/driver-socket';

import dotenv from 'dotenv';

// Load environment variables
dotenv.config();
const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

connectDB();

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req, {
      providers: [
        { provide: 'COOKIES', useValue: req.headers.cookie },
      ]
    })
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});


// Json Body
app.use(express.json());

// Define API routes here (after JSON middleware)
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.get('/api/maptiller/:resource', async (req, res) => {
  const resource = req.params.resource;
  const url = `https://api.maptiler.com/maps/${resource}/style.json?key=${process.env['MAPTILER_KEY']}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Erro no proxy' });
  }
});
/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  const server = createServer(app);
  const io = new SocketIOServer(server, {
    cors: {
      origin: '*', // Change this based on your security needs
    }
  });

  setupDriverSockets(io); // 👈 register your socket logic

  server.listen(port, () => {
    console.log(`Node SSR server listening on http://localhost:${port}`);
  });
}
/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
