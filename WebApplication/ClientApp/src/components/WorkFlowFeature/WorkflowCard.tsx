import * as React from 'react';
import * as WorkflowBoardStore from '../../store/WorkflowBoard';
import classNames from 'classnames';
import styled from 'styled-components'
import {Draggable} from 'react-beautiful-dnd'

const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    background-color: white;
`

interface Props {
    key: string,
    card: {
        id: string,
        content: string
    },
    index: any
}


class WorkflowCard extends React.Component<Props>{
    constructor(props: Props){
        super(props)
    }

    render(){
        return (
            <Draggable
                draggableId={this.props.card.id} 
                index={this.props.index}
            >
                {(provided: any) => (
                    <Container
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        innerRef={provided.innerRef}
                    >
                        <h3>Card id: {this.props.card.id}</h3>
                        <p>Description: {this.props.card.content}</p>
                    </Container>
                )}
                
            </Draggable>
        )
    }
}

export default WorkflowCard;