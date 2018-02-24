import { DIRECTIONS } from '../constants/keys';

const R = require('ramda');

const reducers = {
    MOVE: (state, action) => {
        return Object.assign( {}, state, {
            velocity: R.prop(action.dir, DIRECTIONS)
        } );
    },
    TICK: (state, action) => {
        const { snake, velocity, apple } = state;
        const newSnake = updateSnake(snake, velocity);
        
        const newApple = eatApple(snake, apple, randomAppleTree);
        
        return Object.assign( {}, state, {
            snake: newSnake,
            apple: newApple
        });
    }
}

function updateSnake(snake, dir) {
    const newHead = nextCell(R.head(snake), dir);

    return R.take(4,R.prepend(newHead,snake));
}

function nextCell(cell, velocity) {
    return R.zipWith(R.add, cell, velocity);
}

function eatApple(snake, apple, appleTree) {
    if(R.equals(R.head(snake), apple)) {
        return appleTree()
    }
    return apple;
}

function randomAppleTree() {
    return [ rnd(20), rnd(20) ];
}

function rnd(size) {
    return Math.floor(Math.random() * size);
}

export default (state,action) => {
    
    if(typeof(state) === 'undefined') {
        return {
             velocity: [1,0],
             snake: [[5,5]],
             apple: [10,10]
        };
    }
    
    return action.type in reducers ? reducers[action.type](state, action) : state;
}
