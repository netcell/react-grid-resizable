import React from 'react';
import styled from 'styled-components';
import { GridWrapper, GridWrapperProps } from './GridWrapper';
import { CellProps } from '../CellWrapper/Cell';

const RowsWrapperDiv = styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
    overflow: hidden;
`

export const RowsWrapper = (props: GridWrapperProps<CellProps>) => {
    return <RowsWrapperDiv>
        {GridWrapper<CellProps>({
            ...props,
            direction: 'vertical'
        })}
    </RowsWrapperDiv>
}