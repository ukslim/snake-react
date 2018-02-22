import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Playfield extends Component {
  constructor(props) {
    super(props);
  }



  render() {
    var playfield = [[1,2,3],[4,5,6],[7,8,9]];
    var rows = playfield.map( (row, i) => {
       var entry = row.map( (element, j) =>
           <td key={j}>{element}</td>
         )
       return <tr key={i}>{entry}</tr>
    });
    return <table className="table-hover table-striped table-bordered">
        <tbody>{rows}</tbody></table>;
  }
}

export default Playfield
