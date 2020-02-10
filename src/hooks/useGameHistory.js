import { useEffect, useState } from 'react';
import { getOpenIndexes } from '../utils/utils';

export default function useGameHistory(tiles, player, winner) {
    const [history, setHistory] = useState([]);
    
    useEffect(() => {
        const openIndexes = getOpenIndexes(tiles);
        if (openIndexes.length !== 9) {
            console.log('snapshot history')
            setHistory(history => {
                return [
                    ...history,
                    {
                        winner: (winner) ? winner.player : null,
                        player,
                        tiles
                    }
                ];
            });
        }
    }, [winner, tiles, player]);

    return {
        history,
        setHistory
    }
}