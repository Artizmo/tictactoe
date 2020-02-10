import React, { useCallback, useEffect, useState, useReducer } from 'react';
import ReactDOM from 'react-dom';
import useGetWinner from './hooks/useGetWinner';
import useGameHistory from './hooks/useGameHistory';
import { isTileAvailable, selectRandomFreeIndex, getRandomPlayer, getNextPlayer } from './utils/utils';
import tilesReducer from './reducers/tilesReducer';
import tilesData from './data/tiles';
import Tile from './components/tile';
import Button from './components/button';
import './index.scss';

const Board = () => {
    const [tiles, dispatch] = useReducer(tilesReducer, tilesData);
    const [player, setPlayer] = useState(null);
    const { winner, setWinner } = useGetWinner(tiles);
    const { history } = useGameHistory(tiles, player, winner);

    const resetGame = useCallback(() => {
        dispatch({ type: 'RESET_TILES' })
        setPlayer();
        setWinner();
        // setHistory([]);
    }, [setWinner, setPlayer]);

    const handleNewGameClick = () => {
        console.clear();
        console.log('NEW GAME!');
        resetGame()
        // dispatch({ type: 'RESET_TILES' });
        const newPlayer = getRandomPlayer();
        setPlayer({ ...newPlayer });
        // setWinner();
        // setHistory([]);
    }    

    const takeTurn = useCallback(tile => {
        if (player) {
            dispatch({ type: 'UPDATE_TILES', tile, player });
            const nextPlayer = getNextPlayer(player);
            setPlayer(nextPlayer);
        }
    }, [player]);

    const tileClick = tileIndex => {
        if (player && player.type === 'human') {
            if (isTileAvailable(tiles[tileIndex])) {
                console.log('you choose', tileIndex)
                takeTurn(tileIndex);
            }
        }
    }

    useEffect(() => {
        if (!winner && player && player.type === 'robot') {
            const tileIndex = selectRandomFreeIndex(tiles);
            console.log('robot chooses index', tileIndex);
            takeTurn(tileIndex);
        }
    }, [takeTurn, tiles, player, winner]);

    const mapTiles = tiles.map((tile, i) => <Tile key={i} index={i} tile={tile} handleClick={tileClick} />);

    return (
        <div style={{'display': 'flex'}}>
            <div style={{'flex': 1}}>
                <Button handleClick={handleNewGameClick} label="New Game" />
                <div className={'board'}>
                    {mapTiles}
                </div>
            </div>
            <div style={{'flex': 1}}>
                <div>
                    <i><b>debug: current game</b></i>
                    <pre>winner: {JSON.stringify(winner, null, 2)}</pre>
                    <pre>current player: {JSON.stringify(player, null, 2)}</pre>
                    <pre>{JSON.stringify(tiles, null, 2)}</pre>              
                </div>
            </div>
            <div style={{'flex': 1}}>
                <pre>{JSON.stringify(history, null, 2)}</pre>  
            </div>
        </div>
    )
}

const App = () => {
    return (
        <>
            <h3>Welcome to Brian's Tic Tacky Toe!</h3>
            <Board />
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
