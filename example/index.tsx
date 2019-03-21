import React, { PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Col, ColsWrapper, Row, RowsWrapper } from '../src';

const color: string[] = require('nice-color-palettes')[0];

const Wrapper = styled.div`
    border: 5px grey solid
`

const StyledRow = styled(Row)`
    
`

const StyledCol = styled(Col)`
    
`

const StyledRowWrapper = (props: PropsWithChildren<any>) => {
    return <RowsWrapper separatorProps={{
        style: {
            backgroundColor: color[4], 
        }
    }}>{props.children}</RowsWrapper>
}

const StyledColWrapper = (props: PropsWithChildren<any>) => {
    return <ColsWrapper separatorProps={{
        style: {
            backgroundColor: color[4], 
        }
    }}>{props.children}</ColsWrapper>
}

const App = () => {
    
    return <div>
        <h1>React Grid Resizable Example</h1>
        <Wrapper>
            <StyledRowWrapper>
                <StyledRow initialHeight={100}>
                    <StyledColWrapper>
                        <StyledCol initialWidth={100} style={{ backgroundColor: color[0] }}>
                            1.1
                        </StyledCol>
                        <StyledCol initialWidth={100} left={false} style={{ backgroundColor: color[1] }}>
                            1.2
                        </StyledCol>
                        <StyledCol style={{ backgroundColor: color[2] }}>
                            1.3
                        </StyledCol>
                    </StyledColWrapper>
                </StyledRow>
                <StyledRow initialHeight={150} style={{ backgroundColor: color[2] }}>
                    Dragging the separator below will not change the size of the third row
                </StyledRow>
                <StyledRow initialHeight={300} top={false}>
                    <StyledColWrapper>
                        <StyledCol style={{ backgroundColor: color[1] }}>
                            3.1
                        </StyledCol>
                        <StyledCol>
                            <StyledRowWrapper>
                                <StyledRow initialHeight={100} style={{ backgroundColor: color[0] }}>
                                    3.2.1
                                </StyledRow>
                                <StyledRow style={{ backgroundColor: color[2] }}>
                                    3.2.2
                                </StyledRow>
                            </StyledRowWrapper>
                        </StyledCol>
                    </StyledColWrapper>
                </StyledRow>
                <StyledRow initialHeight={120}>
                    <StyledColWrapper>
                        <StyledCol style={{ backgroundColor: color[0] }}>
                            4.1
                        </StyledCol>
                        <StyledCol initialWidth={100} style={{  backgroundColor: color[1] }}>
                            4.2
                        </StyledCol>
                        <StyledCol style={{  backgroundColor: color[2] }}>
                            4.3
                        </StyledCol>
                    </StyledColWrapper>
                </StyledRow>
            </StyledRowWrapper>
        </Wrapper>
    </div>
}

ReactDOM.render(<App />, document.getElementById('app'));