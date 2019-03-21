import React from 'react';
import styled from 'styled-components';
import { GridWrapper, GridWrapperProps } from './GridWrapper';
import { CellProps } from '../CellWrapper/Cell';

const ColsWrapperDiv = styled.div
`
    display: flex;
    height: 100%;
    overflow: hidden;
`

export const ColsWrapper = (props: GridWrapperProps<CellProps>) => {
    return <ColsWrapperDiv>
        {GridWrapper<CellProps>({
            ...props,
            direction: 'horizontal'
        })}
    </ColsWrapperDiv>
}
