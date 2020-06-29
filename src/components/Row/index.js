import React from 'react'
import Cell from '../Cell/index';

export default function Row(props) {
    const { onCellClick } = props;
    
    return (
        <div className="row">
            {props.cells.map((cell, i) => <Cell key={i} onCellClick={onCellClick} status={cell} />)}
        </div>
    )
}
