import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as WorkflowBoardStore from '../../store/WorkflowBoard';
import WorkflowCard from './WorkflowCard';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
`;
const Title  = styled.h3`
    padding: 8px;
`;
const CardList = styled.div`
    padding: 8px;
`;

interface Props {
    lane: any,
    cards: any
}


class WorkflowLane extends React.Component<Props>{
    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            <Container>
                <Title>{this.props.lane.title}</Title>
                <Droppable droppableId={this.props.lane.id}>
                    {(provided: any) => (
                        <CardList 
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            
                            {this.props.cards.map((card: any, index:any) => <WorkflowCard key={card.id} card={card} index={index}/>)}
                            {provided.placeholder}
                        </CardList>
                    )}
                    
                </Droppable>
                
            </Container>
        )
    }
}


export default WorkflowLane;