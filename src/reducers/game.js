import { DIRECTIONS } from '../constants/keys';

const R = require('ramda');

const reducers = {
    MOVE: (state, action) => {
        return Object.assign( {}, state, {
            velocity: R.prop(action.dir, DIRECTIONS)
        } );
    },
    TICK: (state, action) => {
        return Object.assign( {}, state, eatApple(updateSnake(state), randomAppleTree));
    }
}

function updateSnake(state) {
    const { snake, velocity } = state;
    const { segments, length } = snake;
    const newHead = nextCell(R.head(segments), velocity);

    return R.assoc('snake', 
                    R.assoc('segments',
                            R.take(length,R.prepend(newHead,segments)),
                            snake), 
                    state);
}

const nextCell = R.zipWith(R.add);

function eatApple(state, appleTree) {
    const { snake, apple } = state;
    const { segments } = snake;
    
    if(R.equals(R.head(segments), apple)) {
        return {
            apple: appleTree(),
            snake: lengthen(snake)
        }

    }
    return state;
}

function lengthen(snake) {
    return R.assoc('length', snake.length + 1, snake);
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
             snake: {
                 length: 4,
                 segments: [[5,5]] 
             },
             apple: [10,10]
        };
    }
    
    return action.type in reducers ? reducers[action.type](state, action) : state;
}
