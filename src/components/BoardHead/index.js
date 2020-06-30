import React from 'react'

export default function BoardHead(props) {
    const { flags, isGameOver, isWon } = props;
    console.log(isWon);
    const gameStatus = isGameOver ? <div className="game-status">
        {isWon ? <span className="game-status--success">Seems like you survived!</span> : <span className="game-status--fail">Your fight is over!</span>}
    </div> : null;

    return (
        <div className="board-head">
            <div className="board-head__controls">
                <div className='board-head__flags'>{flags}</div>
                <button className='board-head__new-game-btn' type="button">NEW GAME</button>
            </div>
            <div className="board-head__status">
                {gameStatus}
            </div>
        </div>
    )
}
