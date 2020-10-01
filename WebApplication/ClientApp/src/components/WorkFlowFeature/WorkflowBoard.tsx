import * as React from 'react';
import { connect } from 'react-redux';
import { Applicationprops, ApplicationState } from '../../store'
import * as WorkflowBoardStore from '../../store/WorkflowBoard'
import WorkflowLane from './WorkflowLane';
import { DragDropContext, DropResult, Droppable, DroppableProvided } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { Badge } from 'reactstrap';
import LaneModal, { LaneValues } from './LaneModal';

const Container = styled.div`
    display: flex;
`
const AddLane = styled.span`
    padding: 8px;
    cursor: pointer;
`


type Props = 
    WorkflowBoardStore.WorkflowBoardState &
    typeof WorkflowBoardStore.actionCreators

interface State {
    showNewLaneModal: boolean
}


class WorkflowBoard extends React.Component<Props,State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            showNewLaneModal: false
        }
    }
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
            const newLaneOrder = Array.from(this.props.laneOrder);
            newLaneOrder.splice(source.index, 1);
            newLaneOrder.splice(destination.index, 0, draggableId);

            const newState = {
                ...this.props,
                laneOrder: newLaneOrder
            };
            this.props.updateState(newState)
            return
        }
        
        const startLane = this.props.lanes[source.droppableId];
        const endLane = this.props.lanes[destination.droppableId]

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
                ...this.props,
                lanes: {
                    ...this.props.lanes,
                    [newLane.id]: newLane
                }
            };
            this.props.updateState(newState);
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
                ...this.props,
                lanes: {
                    ...this.props.lanes,
                    [newStartLane.id]: newStartLane,
                    [newEndLane.id]: newEndLane
                }
            };
            this.props.updateState(newState);
            //call server here
        };
        
    }
    handleAddLane = () => {
        this.setState({
            showNewLaneModal: true
        });
    }
    handleNewLaneModalClose = () => {
        this.setState({
            showNewLaneModal: false
        });
    }
    addNewLane = (values: LaneValues) => {
        this.props.addNewLane(values);
    }

    render() {
        const test = this.props;
        return (
            <>
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
                                {this.props.laneOrder.map((laneId: string, index: any) => {
                                    const lane = this.props.lanes[laneId];
                                    const cards = lane.cardIds.map((cardId: string) => this.props.cards[cardId])

                                    return <WorkflowLane key={laneId} lane={lane} cards={cards} index={index}/>
                                })}
                                {provided.placeholder}
                                <AddLane onClick={this.handleAddLane}><Badge color="primary">Add Lane</Badge></AddLane>
                            </Container>
                            )}
                         
                    </Droppable>
                </DragDropContext>
                <LaneModal
                    isOpen={this.state.showNewLaneModal}
                    handleClose={this.handleNewLaneModalClose}
                    laneValues={{ title: '' }}
                    updateLaneValues={this.addNewLane}
                />
            </>
        )
    }
}

export default connect(
    (state: ApplicationState) => state.board,
    WorkflowBoardStore.actionCreators
)(WorkflowBoard);