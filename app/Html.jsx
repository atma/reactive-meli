import React, { PropTypes } from 'react';

const config = require('../webpack/config');
const css = [];
const scripts = [];

if (process.env.NODE_ENV === 'production') {
  const stats = require('../public/dist/assets.json');
  scripts.push(`${stats.vendor.js}`);
  scripts.push(`${stats.app.js}`);

  css.push(`${stats.app.css}`);
} else {
  scripts.push(`${config.output.publicPath}${config.output.filename}`);
}

export default class Html extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string
  };

  static defaultProps = {
    meta: {}
  };

  render() {
    const { title, description } = this.props;
    return (
      <html>
        <head>
          <meta charset="utf-8" />
          <title>{ title }</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
          <meta name="description" content={ description } />
          <link rel="icon" type="image/x-icon" href="/favicon.ico"/>

          { css.map((href, k) => <link key={ k } rel="stylesheet" type="text/css" href={ href } />) }
        </head>

        <body>
          { scripts.map((src, i) => <script src={ src } key={ i } />) }
        </body>
      </html>
    );
  }
}
