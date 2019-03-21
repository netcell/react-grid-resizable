import styled from 'styled-components';
import { Cell } from './Cell';

export const Col = styled(Cell)
`
    height: 100%;
    display: inline-block;
    flex: ${props => (props.initialWidth) ? 'none' : 1};
`;