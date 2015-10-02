/* eslint no-console: 0 */

import fs from 'fs';
import path from 'path';
import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import serveStatic from 'serve-static';
import serveFavicon from 'serve-favicon';
import morgan from 'morgan';
import csurf from 'csurf';

import React from 'react';
import Html from './app/Html.jsx';

const publicPath = path.resolve(__dirname, 'public');

// Initialize express server
export default function (callback) {
  const app = express();

  app.set('env', process.env.NODE_ENV || 'development');
  app.set('host', process.env.HOST || '0.0.0.0');
  app.set('port', process.env.PORT || 3000);

  app.use(morgan(app.get('env') === 'production' ? 'combined' : 'dev'));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(compression());
  app.use(serveFavicon(`${publicPath}/favicon.ico`));

  app.use(csurf({ cookie: true }));

  app.use(serveStatic(publicPath, {maxAge: 365 * 24 * 60 * 60}));

  // Index page
  app.get('/', (req, res) => {
    const html = React.renderToStaticMarkup(
      <Html
        title="Reactive Meli"
        description="Webpack usage demo app" />
    );
    const doctype = "<!DOCTYPE html>";
    res.send(doctype + html);
  });

  // Sample api call
  app.get('/api/sites', (req, res) => {
    let sites = [
      {"id": "MLA", "name": "Argentina"},
      {"id": "MBO", "name": "Bolivia"},
      {"id": "MLB", "name": "Brasil"},
      {"id": "MLC", "name": "Chile"},
      {"id": "MCO", "name": "Colombia"},
      {"id": "MCR", "name": "Costa Rica"},
      {"id": "MRD", "name": "Dominicana"},
      {"id": "MEC", "name": "Ecuador"},
      { "id": "MGT", "name": "Guatemala" },
      {"id": "MLM", "name": "Mexico"},
      {"id": "MPA", "name": "Panamá"},
      {"id": "MPE", "name": "Perú"},
      { "id": "MPT", "name": "Portugal"},
      {"id": "MLU", "name": "Uruguay"},
      {"id": "MLV", "name": "Venezuela"}
    ];

    res.json(sites);
  });

  // Generic server errors (e.g. not caught by components)
  app.use((err, req, res, next) => {
    console.log('Error on request %s %s', req.method, req.url);
    console.log(err);
    console.log(err.stack);
    res.status(500).send('Something bad happened');
  });

  // Finally, start the express application
  return app.listen(app.get('port'), () => callback(app));
}
