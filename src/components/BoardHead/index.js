import React, { Component } from 'react'

export default class BoardHead extends Component {
    constructor(props) {
        super(props);

        this.state = {
            height: props.rows,
            width: props.cells,
            mines: props.mines
        };

        this.onWidthChange = this.onWidthChange.bind(this);
        this.onHeightChange = this.onHeightChange.bind(this);
        this.onMinesChange = this.onMinesChange.bind(this);
    }

    onWidthChange(event) {
        const value = event.target.value;
        this.setState({ width: value }, () => {
            this.updateMinesCount();
        });
    }

    onHeightChange(event) {
        const value = event.target.value;
        this.setState({ height: value }, () => {
            this.updateMinesCount();
        });
    }

    onMinesChange(event) {
        const value = event.target.value;
        this.setState({ mines: value }, () => {
            this.updateMinesCount();
        });
    }

    updateMinesCount() {
        const { width, height, mines } = this.state;
        const mapMax = width * height;

        if (mines > mapMax) { // make sure that that the number of mines is in the limits of map size
            this.setState({ mines: mapMax });
        }
    }

    render() {
        const { width, height, mines } = this.state;
        const { flags, isGameOver, isPlayerWon, onSuperManClick } = this.props;
        const gameStatus = isGameOver ? <div className="game-status">
            {isPlayerWon ? <span className="game-status--success">Seems like you survived!</span> :
                <span className="game-status--fail">Your fight is over!</span>}
        </div> : null;

        return (
            <div className="board-head">
                <div className="board-head__controls">
                    <button onClick={onSuperManClick} type="button">SuperMAN</button>
                    <div className="controls__col">
                        <div className="game-inputs__group">
                            <label className="input-label">
                                Width:
                            <input className="game-input" type="number" onChange={this.onWidthChange} value={width} />
                            </label>
                            <label className="input-label">
                                Height:
                            <input className="game-input" type="number" onChange={this.onHeightChange} value={height} />
                            </label>
                            <label className="input-label">
                                Mines:
                            <input className="game-input" type="number" onChange={this.onMinesChange} value={mines} />
                            </label>
                        </div>
                        <button
                            onClick={() => {
                                this.props.restartGame(height, width, mines)
                            }}
                            className='board-head__new-game-btn'
                            type="button">NEW GAME</button>
                    </div>
                    <div className='board-head__flags'>Flags: {flags}</div>
                </div>
                <div className="board-head__status">
                    {gameStatus}
                </div>
            </div>
        )
    }
}