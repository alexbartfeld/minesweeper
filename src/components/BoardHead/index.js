import React from 'react'

export default function BoardHead(props) {
    const { flags } = props;

    return (
        <div className="board-head">
            <div className='board-head__flags'>{flags}</div>
            <button className='board-head__new-game-btn' type="button">NEW GAME</button>
        </div>
    )
}
