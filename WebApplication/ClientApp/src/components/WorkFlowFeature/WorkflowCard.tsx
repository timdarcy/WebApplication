import * as React from 'react';
import * as WorkflowBoardStore from '../../store/WorkflowBoard';
import styled from 'styled-components'
import {Draggable, DraggableStateSnapshot, DraggableProvided} from 'react-beautiful-dnd'
import { connect, MapStateToProps, DispatchProp } from 'react-redux';
import CardModal from './CardModal';
import { Badge } from 'reactstrap';

const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    transition: background-color 0.2s ease;
    background-color: ${props => (props.isDragging ? "lightgreen": "white")}
`
const EditButton = styled.span`
    cursor: pointer;
`

type Props = {
    card: WorkflowBoardStore.Card,
    index: string,
    actions: typeof WorkflowBoardStore.actionCreators
}

interface State {
    showEditModal: boolean
}


class WorkflowCard extends React.Component<Props, State>{
    constructor(props: Props){
        super(props)
        this.state = {
            showEditModal: false
        }
    }

    handleDescriptionChange = (event: any) => {
       var newCard = {
            ...this.props.card,
            content: event.target.value
        }
        this.props.actions.updateCard(newCard)
    }
    handleModalOpen = () => {
        this.setState({
            showEditModal: true
        });
    }
    handleModalClose = () => {
        this.setState({
            showEditModal: false
        });
    }

    render(){
        return (
            <>
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
                            <h3>{this.props.card.title}</h3>
                            <input onChange={this.handleDescriptionChange} value={this.props.card.content} />
                            <EditButton onClick={this.handleModalOpen}><Badge color="info">edit</Badge></EditButton>
                        </Container>
                    )}
                
                </Draggable>
                <CardModal
                    isOpen={this.state.showEditModal}
                    handleClose={this.handleModalClose}
                    cardValues={{ title: this.props.card.title, content: this.props.card.content }} />
             </>

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