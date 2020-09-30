import * as React from 'react';
import * as WorkflowBoardStore from '../../store/WorkflowBoard';
import styled from 'styled-components'
import {Draggable, DraggableStateSnapshot, DraggableProvided} from 'react-beautiful-dnd'
import { connect, MapStateToProps, DispatchProp } from 'react-redux';
import CardModal, { CardValues } from './CardModal';
import { Badge } from 'reactstrap';
import { MdDeleteForever } from 'react-icons/md';

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
const DeleteButton = styled.span`
    cursor: pointer;
    float:right;
`

type Props = {
    card: WorkflowBoardStore.Card,
    index: string,
    laneId: string,
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

    handleUpdateCardValues = (values: CardValues) => {
        var newCard = {
            ...this.props.card,
            title: values.title,
            content: values.content
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
    handleCardDelete = () => {
        this.props.actions.deleteCard(this.props.card.id, this.props.laneId)
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
                            <DeleteButton onClick={this.handleCardDelete}><Badge color="danger" >Delete</Badge></DeleteButton>
                            <h3>{this.props.card.title}</h3>
                            <p>{this.props.card.content}</p>
                            <EditButton onClick={this.handleModalOpen}><Badge color="info">Edit</Badge></EditButton>
                        </Container>
                    )}
                
                </Draggable>
                <CardModal
                    isOpen={this.state.showEditModal}
                    handleClose={this.handleModalClose}
                    cardValues={{ title: this.props.card.title, content: this.props.card.content }}
                    updateCardValues={this.handleUpdateCardValues}
                    label={{ submit: 'Update Card', cancel: 'Cancel'}}
                />
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