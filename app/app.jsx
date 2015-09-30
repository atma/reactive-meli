import React from 'react';

import Hello from './components/hello/hello.jsx';
import Navigation from 'ui-react-navigation';

import './app.scss';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Navigation />
                <Hello />
            </div>
        );
    }
}
