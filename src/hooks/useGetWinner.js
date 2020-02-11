import { useState } from 'react';
import { playerA, playerB } from '../data/players';
import { getOpenIndexes, getPlayerTileIndexes, WIN_TYPES, WIN_COMBOS } from '../utils/utils';

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
    
        WIN_COMBOS.forEach(combo => {
            if (combo.every(elem => humanIndexes.indexOf(elem) > -1)) {
                setWinner({
                    type: WIN_TYPES.PLAYER,
                    player: playerA
                });
            } else if (combo.every(elem => robotIndexes.indexOf(elem) > -1)) {            
                setWinner({
                    type: WIN_TYPES.PLAYER,
                    player: playerB
                });
            }            
        })
    }

    // useEffect(() => {
    //     if (winner) {
    //         console.log('winner', winner)
    //         if (winner.type === WIN_TYPES.DRAW) {
    //             console.log(`Ugh. Draw!`)
    //         }
    //         if (winner.type === WIN_TYPES.PLAYER) {
    //             console.log(`Congratulations, ${winner.player}!`)
    //         }
    //     }
    // }, [winner]);

    return {
        winner,
        setWinner
    }
}