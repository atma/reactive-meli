require('./app.css');

var component = require('./components/hello');
var app = document.createElement('div');

app.appendChild(component());

document.body.appendChild(app);

