import React from 'react'

export default function Cell(props) {
    const { status: { nearByMines, isOpen, hasMine, hasFlag }, onCellClick } = props;
    let cellClasses = 'cell';
    cellClasses += isOpen ? ' is-open' : '';
    cellClasses += hasMine ? ' has-mine' : '';
    cellClasses += hasFlag ? ' has-flag' : '';

    return (
        <div className={cellClasses} onClick={(event) => { onCellClick(event, props.status) }}>
            {isOpen && nearByMines > 0 ? nearByMines : null}
        </div>
    )
}
