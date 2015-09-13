import React from 'react';

import styles from './hello.css';

export default class Hello extends React.Component {
    render() {
        return <h1 className={styles.heading}>Hello Meli</h1>;
    }
}
