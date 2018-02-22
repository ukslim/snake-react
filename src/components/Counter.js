import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Counter extends Component {
  constructor(props) {
    super(props);
    this.incrementAsync = this.incrementAsync.bind(this);
    this.incrementIfOdd = this.incrementIfOdd.bind(this);
  }

  incrementIfOdd() {
    if (this.props.value % 2 !== 0) {
      this.props.onIncrement()
    }
  }

  incrementAsync() {
    setTimeout(this.props.onIncrement, 1000)
  }

  render() {
    var board = [[0,0,0,0],[0,0,0,0]];
    var  score = 15;
    // const { sscore, sboard } = this.props
    return (
      <div>
      <div id="score">{score}</div>
      <table className="playarea" id="playarea">
        {
          board.map( (row) => {
                <tr>
                    {
                        row.map( cell => {
                            <td>Cell</td>
                        })
                    }
                </tr>
           })
         }
      </table>
      <div className="instructions">
          <ul>
              <li>Arrow keys to move. </li>
              <li>Enter to start again.</li>
          </ul>
      </div>
      </div>
    )
  }
}

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired
}

export default Counter
