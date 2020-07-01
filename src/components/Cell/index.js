import React from 'react'

export default function Cell(props) {
    const { status: { nearByMines, isOpen, hasMine, hasFlag }, onCellClick, isRevealAll } = props;
    let cellClasses = 'cell';
    cellClasses += isRevealAll || isOpen ? ' is-open' : '';
    cellClasses += (isRevealAll || isOpen) && hasMine ? ' has-mine' : '';
    cellClasses += hasFlag ? ' has-flag' : '';

    return (
        <div className={cellClasses} onClick={(event) => { onCellClick(event, props.status) }}>
            {(isRevealAll || isOpen) && nearByMines > 0 ? nearByMines : null}
        </div>
    )
}
