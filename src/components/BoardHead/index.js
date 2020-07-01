import React, { Component } from 'react'

export default class BoardHead extends Component {
    constructor(props) {
        super(props);

        this.state = {
            width: 5,
            height: 5,
            mines: 5
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
        const { flags, isGameOver, isPlayerWon } = this.props;
        const gameStatus = isGameOver ? <div className="game-status">
            {isPlayerWon ? <span className="game-status--success">Seems like you survived!</span> :
                <span className="game-status--fail">Your fight is over!</span>}
        </div> : null;

        return (
            <div className="board-head">
                <div className="board-head__controls">
                    <div>
                        <div className="game-inputs__group">
                            <label className="input-label">
                                Width:
                            <input className="game-input" type="number" onChange={this.onWidthChange} value={this.state.width} />
                            </label>
                            <label className="input-label">
                                Height:
                            <input className="game-input" type="number" onChange={this.onHeightChange} value={this.state.height} />
                            </label>
                            <label className="input-label">
                                Mines:
                            <input className="game-input" type="number" onChange={this.onMinesChange} value={this.state.mines} />
                            </label>
                        </div>
                        <button
                            onClick={() => {
                                this.props.restartGame(this.state.height, this.state.width, this.state.mines)
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