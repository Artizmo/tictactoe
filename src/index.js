import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/board';
import './index.scss';

const App = () => {
    return (
        <>
            <h3>Welcome to Brian's Tic Tacky Toe!</h3>
            <Board />
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
