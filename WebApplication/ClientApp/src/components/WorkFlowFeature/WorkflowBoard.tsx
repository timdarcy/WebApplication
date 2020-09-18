import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store'
import * as WorkflowBoardStore from '../../store/WorkflowBoard'
import WorkflowLane from './WorkflowLane';
import { DragDropContext, DropResult, Droppable, DroppableProvided } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
`

type Props = 
    WorkflowBoardStore.WorkflowBoardState &
    typeof WorkflowBoardStore.actionCreators

interface State {
    cards: any,
    lanes: any,
    laneOrder: any

}

const initialData: State = {
    cards: {
        'card-1': { id: 'card-1', content: 'this is card 1' },
        'card-2': { id: 'card-2', content: 'this is card 2' },
        'card-3': { id: 'card-3', content: 'this is card 3' },
        'card-4': { id: 'card-4', content: 'this is card 4' },
    }, 
    lanes: {
        'lane-1': {
            id: 'lane-1',
            title: 'Lane 1 title',
            cardIds: ['card-1', 'card-2', 'card-3', 'card-4']
        },
        'lane-2': {
            id: 'lane-2',
            title: 'Lane 2 title',
            cardIds: []
        },
        'lane-3': {
            id: 'lane-3',
            title: 'Lane 3 title',
            cardIds: []
        }
    },
    laneOrder: ['lane-1', 'lane-2', 'lane-3']
}

class WorkflowBoard extends React.Component<Props>{
    state = initialData;

    onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId, type } = result;
        if (!destination) {
            return;
        }
        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) {
            return;
        }

        if (type === 'lane') {
            const newLaneOrder = Array.from(this.state.laneOrder);
            newLaneOrder.splice(source.index, 1);
            newLaneOrder.splice(destination.index, 0, draggableId);

            const newState = {
                ...this.state,
                laneOrder: newLaneOrder
            };
            this.setState(newState);
            return
        }
        
        const startLane = this.state.lanes[source.droppableId];
        const endLane = this.state.lanes[destination.droppableId]

        if (startLane === endLane) {
            //moving in the same lane
            const newCardIds = Array.from(startLane.cardIds);
            newCardIds.splice(source.index, 1);
            newCardIds.splice(destination.index, 0, draggableId);

            const newLane = {
                ...startLane,
                cardIds: newCardIds
            };
            const newState = {
                ...this.state,
                lanes: {
                    ...this.state.lanes,
                    [newLane.id]: newLane
                }
            };
            this.setState(newState);
            //call server here
        }
        else {
            //moving between lanes
            const startLaneIds = Array.from(startLane.cardIds)
            startLaneIds.splice(source.index, 1);
            const newStartLane = {
                ...startLane,
                cardIds: startLaneIds
            };

            const endLaneIds = Array.from(endLane.cardIds);
            endLaneIds.splice(destination.index, 0, draggableId);
            const newEndLane = {
                ...endLane,
                cardIds: endLaneIds
            };

            const newState = {
                ...this.state,
                lanes: {
                    ...this.state.lanes,
                    [newStartLane.id]: newStartLane,
                    [newEndLane.id]: newEndLane
                }
            };
            this.setState(newState);
            //call server here
        };
        
    }

    render() {
        return (
            <DragDropContext
                onDragEnd={this.onDragEnd}
            >
                <Droppable
                    droppableId="all-lanes"
                    direction="horizontal"
                    type="lane"
                >
                    {(provided: DroppableProvided) => (
                        <Container
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {this.state.laneOrder.map((laneId: string, index: any) => {
                                const lane = this.state.lanes[laneId];
                                const cards = lane.cardIds.map((cardId: string) => this.state.cards[cardId])

                                return <WorkflowLane key={laneId} lane={lane} cards={cards} index={index}/>
                            })}
                            {provided.placeholder}
                        </Container>
                    )}
                    
                </Droppable>
            </DragDropContext>
        )
    }
}

export default WorkflowBoard;