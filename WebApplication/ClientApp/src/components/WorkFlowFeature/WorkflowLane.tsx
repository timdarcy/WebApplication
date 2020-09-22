import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as WorkflowBoardStore from '../../store/WorkflowBoard';
import WorkflowCard from './WorkflowCard';
import styled from 'styled-components';
import { Droppable, DroppableProvided, DroppableStateSnapshot, Draggable, DraggableProvided } from 'react-beautiful-dnd';

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

interface Props {
    lane: any,
    cards: any,
    index: any
}


class WorkflowLane extends React.Component<Props>{
    constructor(props: any) {
        super(props)
    }

    handleCardPropsUpdate = (newProps: any) => {

    }

    render() {
        return (
            <Draggable
                draggableId={this.props.lane.id}
                index={this.props.index}
            >
                {(provided: DraggableProvided) => (
                    <Container
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                    >
                        <Title
                            {...provided.dragHandleProps}
                        >{this.props.lane.title}</Title>
                        <Droppable
                            droppableId={this.props.lane.id}
                            type="card"
                        >
                            {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                                <CardList
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    isDraggingOver={snapshot.isDraggingOver}
                                >

                                    {this.props.cards.map((card: any, index: any) => <WorkflowCard key={card.id} card={card} index={index} />)}
                                    {provided.placeholder}
                                </CardList>
                            )}

                        </Droppable>
                    </Container>
                    )
                }
            </Draggable>
        )
    }
}


export default WorkflowLane;