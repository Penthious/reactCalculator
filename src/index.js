import React from 'react';
import ReactDOM from 'react-dom';

import Calculator from './components/Calculator';

export default class App extends React.Component {
    render() {
        return (
            <Calculator />
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));