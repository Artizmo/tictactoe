import { playerA, playerB } from '../data/players';

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

export const selectRandomFreeIndex = tiles => {
    const openIndexes = getOpenIndexes(tiles);
    if (openIndexes.length) {
        const randomIndex = openIndexes[Math.floor(Math.random() * openIndexes.length)]
        return randomIndex;
    }
}