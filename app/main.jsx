import React from 'react';
import App from './app.jsx';

const app = document.createElement('div');
document.body.appendChild(app);

React.render(<App />, app);
