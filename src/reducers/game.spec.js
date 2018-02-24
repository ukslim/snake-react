import game from './game';

import { UP, DOWN, LEFT, RIGHT} from '../constants/keys';

function A_GAME_STATE() {
    return {
             velocity: [1,0],
             snake: {
                 length: 4,
                 segments: [[5,5],[5,4],[5,3],[4,3]]
             },
             apple: [10,10]
    }
}

describe('reducers', () => {
  describe('game', () => {
    it('should provide the initial state', () => {
      expect(game(undefined, {})).toEqual({
             velocity: [1,0],
             snake: {
                 length: 4,
                 segments: [[5,5]] 
             },
             apple: [10,10]
      })
    })

    it('should handle MOVE UP action', () => {
      expect(game(A_GAME_STATE, { type: 'MOVE', dir: UP }).velocity).toEqual([-1,0])
    })

    it('should handle MOVE DOWN action', () => {
      expect(game(A_GAME_STATE, { type: 'MOVE', dir: DOWN }).velocity).toEqual([1,0])
    })
        
    it('should handle MOVE LEFT action', () => {
      expect(game(A_GAME_STATE, { type: 'MOVE', dir: LEFT }).velocity).toEqual([0,-1])
    })

    it('should handle MOVE DOWN action', () => {
      expect(game(A_GAME_STATE, { type: 'MOVE', dir: RIGHT }).velocity).toEqual([0,1])
    })

    it('should ignore unknown actions', () => {
      expect(game(A_GAME_STATE(), { type: 'unknown' })).toEqual(A_GAME_STATE());
    })
    
    it('should handle TICK action in middle of field', () => {
      const state = Object.assign({}, A_GAME_STATE(), {
          snake: {
                 length: 4,
                 segments: [[5,5],[5,4],[5,3],[4,3]]
          }
      })
      expect(game(state, {type: 'TICK' }).snake).toEqual({
          length: 4,
          segments: [[6, 5], [5, 5], [5, 4], [5, 3]] })
    })
    
    it('should handle TICK action and eat an apple', () => {
      const state = Object.assign({}, A_GAME_STATE(), {
          apple: [6,5],
          snake: {
              length: 4,
              segments: [[5,5],[5,4],[5,3],[4,3]]
          }
      })
      expect(game(state, {type: 'TICK' }).snake).toEqual({
              length: 5,
              segments: [[6,5],[5,5],[5,4],[5,3]]
          })
    })
  })
})
