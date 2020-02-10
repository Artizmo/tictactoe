import React from 'react';
import Symbol from './symbol';

const Tile = props => {
    return (
        <div className={'tile'} onClick={e => props.handleClick(props.index)}>
            <Symbol xo={props.tile} />
        </div>
    )
}

export default Tile;