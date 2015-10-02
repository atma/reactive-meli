import React from 'react';

import styles from './hello.css';

export default class Hello extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sites: []
    }
  }

  componentWillMount() {
    fetch('/api/sites')
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({
          sites: json
        });
      });
  }

  render() {
    let sites = this.state.sites;

    return (
      <div>
        <h1 className={styles.heading}>Hello Meli</h1>
        <ul className={styles.sites}>
          {sites.map((site) => {
            return <li key={site.id}>{site.id}: {site.name}</li>;
          })}
        </ul>
      </div>
    );
  }
}
