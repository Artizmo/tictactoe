import { playerA, playerB } from '../data/players';

export const WIN_TYPES = {
    PLAYER: 'PLAYER',
    DRAW: 'DRAW'
}

export const WIN_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
];  

export const getRandomPlayer = () => {
    return (Math.floor(Math.random() * 2) + 1 === 1) ? playerA : playerB;
}

export const getNextPlayer = currentPlayer => {
    return (currentPlayer.type==='robot') ? playerA : playerB;
}

export const isTileAvailable = tile => (tile !== 'x' && tile !== 'o');

export const getPlayerTileIndexes = (tiles, player) => {
    return tiles.reduce((playerIndexes, tile, i) => {
        if (tile === player.xo) {
            playerIndexes.push(i)
        }
        return playerIndexes;
    }, []);
}

export const getOpenIndexes = tiles => {
    return tiles.reduce((acc, cur, i) => {
        if (isTileAvailable(cur)) {
            acc.push(i)
        }
        return acc;
    }, [])
}

export const getWinnerText = winner => {
    if (winner) {
        console.log('...', winner)
        return (winner.type === WIN_TYPES.PLAYER) ? winner.player : winner.type;
    }
}

export const selectRandomFreeIndex = tiles => {
    const openIndexes = getOpenIndexes(tiles);
    if (openIndexes.length) {
        const randomIndex = openIndexes[Math.floor(Math.random() * openIndexes.length)]
        return randomIndex;
    }
}