/*eslint-env mocha, jasmine, esx */
/*eslint-env es_modules */
import React from 'react';
import { shallow } from 'enzyme';
import Playfield from './Playfield';

function setup(board=[[123],[4,5,6],[7,8,9]]) {
    
    const component = shallow(
        <Playfield board={board} />
    );
    
    return {
        component: component,
        table: component.find('table')
    }
    
}

describe('Playfield component', () => {
    it("should display the board"), () => {
        const { table } = setup();
        expect(table).toEqual(
           "<table><td>1</td></table>"
        );
    }
});