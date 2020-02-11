import React, { useCallback, useEffect, useState, useReducer } from 'react';
import useGetWinner from '../hooks/useGetWinner';
import useGameHistory from '../hooks/useGameHistory';
import { selectRandomFreeIndex, isTileAvailable, getRandomPlayer, getNextPlayer } from '../utils/utils';
import minimax from '../utils/minimax';
import tilesReducer from '../reducers/tilesReducer';
import tilesData from '../data/tiles';
import Tile from './tile';
import Button from './button';

const Board = () => {
    const [tiles, dispatch] = useReducer(tilesReducer, tilesData);
    const [player, setPlayer] = useState(null);
    const { winner, setWinner } = useGetWinner(tiles);
    const { history, setHistory } = useGameHistory(tiles, player, winner);
    const [godMode, setGodMode] = useState(false);

    const resetGame = useCallback(() => {
        dispatch({ type: 'RESET_TILES' })
        setPlayer();
        setWinner();
        setHistory([]);
    }, [setHistory, setWinner, setPlayer]);

    const handleNewGameClick = () => {
        console.clear();
        console.log('NEW GAME!');
        resetGame();
        const newPlayer = getRandomPlayer();
        setPlayer({ ...newPlayer });
    }    

    const handleModeClick = () => {
        setGodMode(!godMode);
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
            let tile = 0;
            if (godMode) {
                const bestMove = minimax(tiles, player);
                tile = bestMove.index;
            } else {
                tile = selectRandomFreeIndex(tiles);
            }
            console.log('move', tile);
            takeTurn(tile);
        }
    }, [takeTurn, tiles, player, winner, godMode]);

    const mapTiles = tiles.map((tile, i) => <Tile key={i} index={i} tile={tile} handleClick={tileClick} />);

    return (
        <div style={{'display': 'flex'}}>
            <div style={{'flex': 1}}>
                <Button handleClick={handleNewGameClick} label="New Game" />
                <input type="checkbox" onClick={handleModeClick} />
                <span>Godmode: {(godMode) ? 'true' : 'false' }</span>
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
                <div>
                    <i><b>debug: move history</b></i>
                    <pre>{JSON.stringify(history, null, 2)}</pre>  
                </div>
            </div>
        </div>
    )
}

export default Board;