import tilesData from '../data/tiles';

const tilesReducer = (state, action) => {
    switch (action.type) {
    case 'RESET_TILES':
        return [
            ...tilesData
        ]
    case 'UPDATE_TILES':
        return state
        .map((tile, i) => {
            if (i === action.tile) {
                tile = action.player.xo
            }
            return tile;
        })
    default:
        return state;
    }
}

export default tilesReducer;
