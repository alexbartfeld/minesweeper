import React from 'react'
import Cell from '../Cell/index';

export default function Row(props) {
    const { reveal } = props;
    
    return (
        <div className="row">
            {props.cells.map((cell, i) => <Cell key={i} reveal={reveal} status={cell} />)}
        </div>
    )
}
