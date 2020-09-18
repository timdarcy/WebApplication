import * as React from 'react';
import * as WorkflowBoardStore from '../../store/WorkflowBoard';
import classNames from 'classnames';
import styled from 'styled-components'
import {Draggable, DraggableStateSnapshot, DraggableProvided} from 'react-beautiful-dnd'

const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    transition: background-color 0.2s ease;
    background-color: ${props => (props.isDragging ? "lightgreen": "white")}
`

interface Props {
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
                {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                    <Container
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        isDragging={snapshot.isDragging}
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