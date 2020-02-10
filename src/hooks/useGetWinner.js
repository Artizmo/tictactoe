import { useEffect, useState } from 'react';
import { playerA, playerB } from '../data/players';
import { getOpenIndexes, getPlayerTileIndexes } from '../utils/utils';

const WIN_TYPES = {
    PLAYER: 1,
    DRAW: 2
}

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
];    

export default function useGetWinner(tiles) {
    const [winner, setWinner] = useState();
    const openIndexes = getOpenIndexes(tiles);

    if (!winner && openIndexes.length === 0) {
        setWinner({
            type: WIN_TYPES.DRAW
        });
    }

    if (!winner && openIndexes.length < 5) {
        const humanIndexes = getPlayerTileIndexes(tiles, playerA);
        const robotIndexes = getPlayerTileIndexes(tiles, playerB);
    
        winningCombos.forEach(combo => {
            if (combo.every(elem => humanIndexes.indexOf(elem) > -1)) {
                setWinner({
                    type: WIN_TYPES.PLAYER,
                    player: playerA.name
                });
            } else if (combo.every(elem => robotIndexes.indexOf(elem) > -1)) {            
                setWinner({
                    type: WIN_TYPES.PLAYER,
                    player: playerB.name
                });
            }            
        })
    }

    useEffect(() => {
        if (winner) {
            console.log('winner', winner)
            if (winner.type === WIN_TYPES.DRAW) {
                console.log(`Ugh. Draw!`)
            }
            if (winner.type === WIN_TYPES.PLAYER) {
                console.log(`Congratulations, ${winner.player}!`)
            }
        }
    }, [winner]);

    return {
        winner,
        setWinner
    }
}