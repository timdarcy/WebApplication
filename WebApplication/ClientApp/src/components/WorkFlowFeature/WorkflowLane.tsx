import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as WorkflowBoardStore from '../../store/WorkflowBoard';
import WorkflowCard from './WorkflowCard';
import styled from 'styled-components';
import { Droppable, DroppableProvided, DroppableStateSnapshot, Draggable, DraggableProvided } from 'react-beautiful-dnd';
import CardModal, { CardValues } from './CardModal';
import { Badge } from 'reactstrap';
import LaneModal, { LaneValues } from './LaneModal';


const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    background-color:white;
    border-radius: 2px;
    width: 220px;
    display: flex;
    flex-direction: column;
`;
const Title  = styled.h3`
    padding: 8px;
`;
const CardList = styled.div`
    padding: 8px;
    transition: background-color 0.2s ease;
    background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'inherit')};
    flex-grow: 1;
    min-height:100px;
`;
const AddCard = styled.span`
    padding: 8px;
    cursor: pointer
`
const EditLane = styled.span`
    padding: 8px;
    cursor: pointer
`
const DeleteButton = styled.span`
    padding: 8px;
    cursor: pointer;
    float: right;
`

interface Props {
    lane: WorkflowBoardStore.Lane,
    cards: any,
    index: any,
    actions: typeof WorkflowBoardStore.actionCreators
}

interface State {
    showCardModal: boolean,
    showLaneModal: boolean
}


class WorkflowLane extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props)
        this.state = {
            showCardModal: false,
            showLaneModal: false
        }
    }

    handleCardPropsUpdate = (newProps: any) => {

    }

    handleTitleChange = (event: any) => {
        var newLane = {
            ...this.props.lane,
            ['title']: event.target.value
        }
        this.props.actions.updateLane(newLane)
    }

    handleAddCard = () => {
        this.setState({
            showCardModal: true
        });
    }

    handleCardModalClose = () => {
        this.setState({
            showCardModal: false
        });
    }
    handleUpdateCardValues = (values: CardValues) => {
        this.props.actions.addNewCard(this.props.lane.id, values);
    }
    handleEditLane = () => {
        this.setState({
            showLaneModal: true
        });
    }
    handleLaneModalClose = () => {
        this.setState({
            showLaneModal: false
        });

    }
    handleUpdateLaneValues = (values: LaneValues) => {
        var newLane = {
            ...this.props.lane,
            title: values.title
        }
        this.props.actions.updateLane(newLane)
    }

    handleDeleteLane = () => {
        this.props.actions.deleteLane(this.props.lane.id)
    }

    render() {
        return (
            <>
                <Draggable
                    draggableId={this.props.lane.id}
                    index={this.props.index}
                >
                    {(provided: DraggableProvided) => (
                        <Container
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                        >
                            <DeleteButton onClick={this.handleDeleteLane}><Badge color="danger">Delete</Badge></DeleteButton>
                            <Title
                                {...provided.dragHandleProps}
                            >{this.props.lane.title}</Title>
                            
                            <Droppable
                                droppableId={this.props.lane.id}
                                type="card"
                            >
                                {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                                    <>
                                        <CardList
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            isDraggingOver={snapshot.isDraggingOver}
                                        >

                                            {this.props.cards.map((card: any, index: any) => <WorkflowCard key={card.id} card={card} index={index} laneId={this.props.lane.id}/>)}
                                            {provided.placeholder}
                                        </CardList>
                                        <AddCard onClick={this.handleAddCard}><Badge color="primary">Add Card</Badge></AddCard>
                                        <EditLane onClick={this.handleEditLane}><Badge color="info">Edit Lane</Badge></EditLane>
                                    </>
                                )}

                            </Droppable>
                        </Container>
                        )
                    }
                </Draggable>
                <CardModal
                    isOpen={this.state.showCardModal}
                    handleClose={this.handleCardModalClose}
                    cardValues={{ title: '', content: '' }}
                    updateCardValues={this.handleUpdateCardValues}
                    labels={{ submit: 'Create Card', cancel: 'Cancel'}}
                />
                <LaneModal
                    isOpen={this.state.showLaneModal}
                    handleClose={this.handleLaneModalClose}
                    laneValues={{ title: this.props.lane.title}}
                    updateLaneValues={this.handleUpdateLaneValues}
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
)(WorkflowLane);