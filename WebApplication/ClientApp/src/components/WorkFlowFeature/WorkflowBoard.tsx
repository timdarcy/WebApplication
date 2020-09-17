import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store'
import * as WorkflowBoardStore from '../../store/WorkflowBoard'
import WorkflowLane from './WorkflowLane';
import { DragDropContext } from 'react-beautiful-dnd';

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
        }
    },
    laneOrder: ['lane-1']
}

class WorkflowBoard extends React.Component<Props>{
    state = initialData;

    onDragEnd = (result: any) => {
        const { destination, source, draggableId } = result;
        if (!destination) {
            return;
        }
        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) {
            return;
        }
        const lane = this.state.lanes[source.droppableId];
        const newCardIds = Array.from(lane.cardIds);
        newCardIds.splice(source.index, 1);
        newCardIds.splice(destination.index, 0, draggableId);

        const newLane = {
            ...lane,
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

    render() {
        return (
            <DragDropContext
                onDragEnd={this.onDragEnd}
            >
            {   this.state.laneOrder.map((laneId: string) => {
                    const lane = this.state.lanes[laneId];
                    const cards = lane.cardIds.map((cardId: string) => this.state.cards[cardId])

                    return <WorkflowLane key={laneId} lane={lane} cards={cards}/>
                })
            }
            </DragDropContext>
        )
    }
}

export default WorkflowBoard;