import { useEffect, useState } from 'react';
import { getWinnerText, getOpenIndexes } from '../utils/utils';

export default function useGameHistory(tiles, player, winner) {
    const [history, setHistory] = useState([]);
    
    useEffect(() => {
        const openIndexes = getOpenIndexes(tiles);
        const winnerText = getWinnerText(winner);
        if (openIndexes.length !== 9) {
            console.log('snapshot history')
            setHistory(history => {
                return [
                    ...history,
                    {
                        winner: winnerText,
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