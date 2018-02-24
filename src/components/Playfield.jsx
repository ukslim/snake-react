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
    
    this.timer = window.setInterval(this.props.tick, 200);

    // this.props.onLoad();
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    
    window.clearInterval(this.timer);
  }
  onKeyDown(e) {

    if (R.values([UP, DOWN, LEFT, RIGHT]).indexOf(e.keyCode) !== -1) {
      // Prevent page from scrolling when pressing arrow keys
      e.preventDefault();

      this.props.move(e.keyCode);
    }
  }
  
  onKeyUp(e) {
      
  }


  render() {
    const { snake, apple } = this.props.state;
    
    const cell = (x,y) => <td className={ R.contains([x,y], snake.segments) || R.equals([x,y],apple) ? "filled" : ""}>&nbsp;</td>
    
    const row = x => <tr>{ R.times( y => cell(x,y), 20) }</tr>
    
    const rows = R.times(row, 20)
    
    return  <div>
           <table className="playarea">
               <tbody>{rows}</tbody>
           </table>
        </div>;
  }
}

export default Playfield
