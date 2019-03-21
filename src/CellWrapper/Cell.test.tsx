import React from 'react';
import { act, render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import { Cell } from './Cell';
import { Col } from './Col';
import { Row } from './Row';

describe('Cells', () => {

    test('Cell onRef', () => {
        const onRef = jest.fn<void, [HTMLDivElement]>()

        const {
            container
        } = render(<Cell onRef={onRef} />);

        expect(onRef).toBeCalledWith(container.children[0]);
    });

});

describe('Row', () => {

    test('Row without initial height', () => {
        const {
            container
        } = render(<Row />);

        const element = (container.children as HTMLCollectionOf<HTMLElement>)[0];
        
        expect(getComputedStyle(element).flex).toBe("1");
    });

    test('Row with initial height', async () => {
        let element;

        act(() => {
            const {
                container
            } = render(<Row initialHeight={100} />);

            element = (container.children as HTMLCollectionOf<HTMLElement>)[0];
        });
        
        expect(getComputedStyle(element).flex).toBe("0 0 auto");
        expect(getComputedStyle(element).width).toBe("100%");
        expect(getComputedStyle(element).height).toBe("100px");
    });
});

describe('Col', () => {

    test('Col without initial width', () => {
        const {
            container
        } = render(<Col />);

        const element = (container.children as HTMLCollectionOf<HTMLElement>)[0];
        
        expect(getComputedStyle(element).flex).toBe("1");
    });

    test('Col with initial width', async () => {
        let element;

        act(() => {
            const {
                container
            } = render(<Col initialWidth={100} />);

            element = (container.children as HTMLCollectionOf<HTMLElement>)[0];
        });
        
        expect(getComputedStyle(element).flex).toBe("0 0 auto");
        expect(getComputedStyle(element).height).toBe("100%");
        expect(getComputedStyle(element).width).toBe("100px");
    });
});