import * as React from 'react';
import * as WorkflowBoardStore from '../../store/WorkflowBoard';
import styled from 'styled-components'
import {Draggable, DraggableStateSnapshot, DraggableProvided} from 'react-beautiful-dnd'
import { connect, MapStateToProps, DispatchProp } from 'react-redux';

const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    transition: background-color 0.2s ease;
    background-color: ${props => (props.isDragging ? "lightgreen": "white")}
`

/*interface Props {
    card: {
        id: string,
        content: string
    },
    index: any,
    WorkflowBoardStore.actionCreators.updateCard
}*/
type Props = {
    card: WorkflowBoardStore.Card,
    index: string,
    actions: typeof WorkflowBoardStore.actionCreators
}


class WorkflowCard extends React.Component<Props>{
    constructor(props: Props){
        super(props)
    }

    handleDescriptionChange = (event: any) => {
       var newCard = {
            id: this.props.card.id,
            content: event.target.value
        }
        this.props.actions.updateCard(newCard)
        console.log(newCard)
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
                        <input onChange={this.handleDescriptionChange} value={this.props.card.content}/>
                    </Container>
                )}
                
            </Draggable>
        )
    }
}

function mergeProps(stateProps: any, dispatchProps: any, ownProps: any) {
    return {
        ...ownProps,
        actions: dispatchProps  
    }
}

export default connect(
    null,
    WorkflowBoardStore.actionCreators,
    mergeProps
)(WorkflowCard);