import React from 'react';
import { act, fireEvent, render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import { Direction } from '../hooks/useRefsWithInitialSize';
import { Separator } from './Separator';
import { actDrag } from './dragTestUtils';

describe('Separator Drag Events', () => {

    const prepare = (direction: Direction) => {
        const onDragStart  = jest.fn<void, []>();
        const onDrag       = jest.fn<void, [number]>();

        const {
            container,
            baseElement,
        } = render( <Separator 
            direction   = {direction}
            onDragStart = {onDragStart}
            onDrag      = {onDrag}
        />);
    
        const element = container.children[0];

        actDrag({
            element,
            baseElement,
            to: {
                clientX: 100,
                clientY: 150,
            }
        });

        return {
            onDragStart,
            onDrag,
        }
    };

    test('Horizontal Separator', () => {
        const {
            onDragStart,
            onDrag
        } = prepare('horizontal');
        expect(onDragStart).toBeCalledTimes(1);
        expect(onDrag).toBeCalledTimes(1);
        expect(onDrag).toBeCalledWith(100);
    });

    test('Vertical Separator', () => {
        const {
            onDragStart,
            onDrag
        } = prepare('vertical');
        expect(onDragStart).toBeCalledTimes(1);
        expect(onDrag).toBeCalledTimes(1);
        expect(onDrag).toBeCalledWith(150);
    });
});