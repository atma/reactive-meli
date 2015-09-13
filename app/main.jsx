import React from 'react';
import Hello from './components/hello/hello.jsx';

import './app.scss';

const app = document.createElement('div');
document.body.appendChild(app);

React.render(<Hello />, app);
