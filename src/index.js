import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import Playfield from './components/Playfield';
import game from './reducers/game';

const store = createStore(game)
const rootEl = document.getElementById('root')

const render = () => ReactDOM.render(
  <Playfield  state={store.getState()}
    move = {(key) => store.dispatch({ type: 'MOVE', dir: key})}
    tick = {() => store.dispatch({ type: 'TICK'})}
  />,
  rootEl
)

render()
store.subscribe(render)
