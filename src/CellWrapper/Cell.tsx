import React, { CSSProperties, ReactElement, useState, useEffect } from 'react';
import styled from 'styled-components';
import { ForwardRefProps } from '../hooks/useRefsWithInitialSize';
import { ResizeDirectionOptions } from './ResizeDirectionOptions';

export type CellProps = ForwardRefProps<HTMLDivElement> & ResizeDirectionOptions & {
    children?: string | ReactElement<CellProps> | ReactElement<CellProps>[];
    style?: CSSProperties;
    className?: string;
    initialWidth?: number;
    initialHeight?: number;
}

export const Cell = styled((props: CellProps) => {
    const [initialWidth, setInitialWidth]   = useState<number>(null);
    const [initialHeight, setInitialHeight] = useState<number>(null);

    useEffect(() => {
        setInitialHeight(props.initialHeight);
        setInitialWidth(props.initialWidth);
    }, []);

    return <div 
        ref       = {props.onRef}
        style     = {{
            height: initialHeight,
            width: initialWidth,
            ...props.style,
        }}
        className = {props.className}
    >
        {props.children}
    </div>
})
`
    box-sizing: border-box;
    overflow: hidden;
`;