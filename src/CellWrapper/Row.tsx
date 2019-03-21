import styled from 'styled-components';
import { Cell } from './Cell';

export const Row = styled(Cell)
`
    width: 100%;
    flex: ${props => (props.initialHeight) ? 'none' : 1};
`;