import React from 'react';
import { act, render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import { Row } from '../CellWrapper/Row';
import { actDrag } from '../Separators/dragTestUtils';
import { RowsWrapper } from './RowsWrapper';

describe('Row Wrapper', () => {
    beforeEach(() => {
        HTMLElement.prototype.getBoundingClientRect = function() {
            const style = getComputedStyle(this);

            const width = parseInt(style.width.replace('px', ''))
            const height = parseInt(style.height.replace('px', ''))

            const clientRect = {
                bottom: 0,
                height: height || 100,
                left: 0,
                right: 0,
                top: 0,
                width: width || 200,
            }

            return clientRect;
        };
    })

    test('3 rows', async () => {
        let baseElement: HTMLElement;
        let rowsWrapper: HTMLElement;
        let rows: HTMLCollectionOf<HTMLElement>;
        act(() => {
            const renderResult = render(<RowsWrapper>
                <Row key={1} initialHeight={100}/>
                <Row key={2} initialHeight={100}/>
                <Row key={3} initialHeight={100}/>
            </RowsWrapper>)

            const container = renderResult.container;
            baseElement = renderResult.baseElement;
            rowsWrapper = (container.children as HTMLCollectionOf<HTMLElement>)[0];
            rows = rowsWrapper.children as HTMLCollectionOf<HTMLElement>;
        });

        expect(rows.length).toEqual(5);

        actDrag({
            element: rows[1],
            baseElement,
            to: {
                clientX: 20,
                clientY: 30,
            }
        });

        expect(getComputedStyle(rows[0]).height).toEqual('130px');
        expect(getComputedStyle(rows[0]).flex).toEqual('0 0 auto');
        expect(getComputedStyle(rows[2]).height).toEqual('70px');
        expect(getComputedStyle(rows[2]).flex).toEqual('0 0 auto');
        expect(getComputedStyle(rows[4]).height).toEqual('100px');
        expect(getComputedStyle(rows[4]).flex).toEqual('0 0 auto');

        actDrag({
            element: rows[3],
            baseElement,
            to: {
                clientX: 20,
                clientY: 30,
            }
        });

        expect(getComputedStyle(rows[0]).height).toEqual('130px');
        expect(getComputedStyle(rows[0]).flex).toEqual('0 0 auto');
        expect(getComputedStyle(rows[2]).height).toEqual('100px');
        expect(getComputedStyle(rows[2]).flex).toEqual('0 0 auto');
        expect(getComputedStyle(rows[4]).height).toEqual('70px');
        expect(getComputedStyle(rows[4]).flex).toEqual('0 0 auto');
    })

    test('3 rows with 2nd row not resize by the first separator', async () => {
        let baseElement: HTMLElement;
        let rowsWrapper: HTMLElement;
        let rows: HTMLCollectionOf<HTMLElement>;
        act(() => {
            const renderResult = render(<RowsWrapper>
                <Row key={1} initialHeight={100}/>
                <Row key={2} top={false} initialHeight={100}/>
                <Row key={3} initialHeight={100}/>
            </RowsWrapper>)

            const container = renderResult.container;
            baseElement = renderResult.baseElement;
            rowsWrapper = (container.children as HTMLCollectionOf<HTMLElement>)[0];
            rows = rowsWrapper.children as HTMLCollectionOf<HTMLElement>;
        });

        expect(rows.length).toEqual(5);

        actDrag({
            element: rows[1],
            baseElement,
            to: {
                clientX: 20,
                clientY: 30,
            }
        });

        expect(getComputedStyle(rows[0]).height).toEqual('130px');
        expect(getComputedStyle(rows[0]).flex).toEqual('0 0 auto');
        expect(getComputedStyle(rows[2]).height).toEqual('100px');
        expect(getComputedStyle(rows[2]).flex).toEqual('0 0 auto');
        expect(getComputedStyle(rows[4]).height).toEqual('100px');
        expect(getComputedStyle(rows[4]).flex).toEqual('0 0 auto');

        actDrag({
            element: rows[3],
            baseElement,
            to: {
                clientX: 20,
                clientY: 30,
            }
        });

        expect(getComputedStyle(rows[0]).height).toEqual('130px');
        expect(getComputedStyle(rows[0]).flex).toEqual('0 0 auto');
        expect(getComputedStyle(rows[2]).height).toEqual('130px');
        expect(getComputedStyle(rows[2]).flex).toEqual('0 0 auto');
        expect(getComputedStyle(rows[4]).height).toEqual('70px');
        expect(getComputedStyle(rows[4]).flex).toEqual('0 0 auto');
    })

    
});