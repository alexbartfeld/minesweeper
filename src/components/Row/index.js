import React from 'react'
import Cell from '../Cell/index';

export default function Row(props) {
    const { onCellClick, isRevealAll } = props;

    return (
        <div className="row">
            {
                props.cells.map((cell, i) => {
                    return <Cell
                        key={i}
                        isRevealAll={isRevealAll}
                        onCellClick={onCellClick}
                        status={cell} />
                })
            }
        </div>
    )
}
