import React from 'react'

export default function Cell(props) {
    const { status: { nearByMines, isOpen, hasMine, hasFlag }, reveal } = props;
    let cellClasses = 'cell';
    cellClasses += isOpen ? ' is-open' : '';
    cellClasses += hasMine ? ' has-mine' : '';
    cellClasses += hasFlag ? ' has-flag' : '';

    return (
        <div className={cellClasses} onClick={() => { reveal(props.status) }}>
            {nearByMines > 0 ? nearByMines : null}
        </div>
    )
}
