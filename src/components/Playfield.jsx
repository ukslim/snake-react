import React from 'react';

import { UP, DOWN, LEFT, RIGHT } from '../constants/keys';

const R = require('ramda');

class Playfield extends React.Component {
    
  constructor(props) {
    super(props);

    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }
  
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    
    this.timer = window.setInterval(this.props.tick, 250);

    // this.props.onLoad();
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    
    window.clearInterval(this.timer);
  }
  onKeyDown(e) {
    // Prevent page from scrolling when pressing arrow keys
    if (R.values([UP, DOWN, LEFT, RIGHT]).indexOf(e.keyCode) !== -1) {
      e.preventDefault();
      this.props.move(e.keyCode);
    }
  }
  
  onKeyUp(e) {
      
  }


  render() {
    const { grid } = this.props.state;
    
    const rows = grid.map( (row, i) => {
       const entry = row.map( (element, j) =>
           <td className={element.isHead === true ? "filled" : ""} key={j}>&nbsp;</td>
         )
       return <tr key={i}>{entry}</tr>
    });
    return  <div>
           <table className="playarea">
               <tbody>{rows}</tbody>
           </table>
        </div>;
  }
}

export default Playfield
