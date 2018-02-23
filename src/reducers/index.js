import { DIRECTIONS } from '../constants/keys';

const R = require('ramda');


const reducers = {
    MOVE: (state, action) => {
        return Object.assign( {}, state, {
            velocity: R.prop(action.dir, DIRECTIONS)
        } );
    },
    TICK: (state, action) => {
        
        return Object.assign( {}, state, {
            snakeX: state.snakeX + state.velocity[0],
            snakeY: state.snakeY + state.velocity[1],
            grid: incrementGrid(state)
        });
    }
}

function newGrid() {
    const row = () => R.times(() => { return {} }, 20);
    return R.times(row, 20);
}

function incrementGrid(state) {
    
    const grid = newGrid();
    grid[state.snakeX][state.snakeY].isHead = true;

    return grid;
}



export default (state,action) => {
    
    if(typeof(state) === 'undefined') {
        return {
             grid: newGrid(),
             velocity: [1,0],
             snakeX: 5,
             snakeY: 5,
        };
    }
    
    return action.type in reducers ? reducers[action.type](state, action) : state;
    


}
