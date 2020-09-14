import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as WorkflowBoardStore from '../../store/WorkflowBoard';
import WorkflowCard from './WorkflowCard';
import { DraggableTypes } from './DraggableTypeConstants';
import { useDrop } from 'react-dnd'

type Props = WorkflowBoardStore.Lane &
    typeof WorkflowBoardStore.actionCreators



const WorkflowLane: React.FC<Props> = (props) => {
    const [numberOfCards, setNumberOfCards] = useState(1);


    const [{ isOver }, drop] = useDrop({
        accept: DraggableTypes.CARD,
        drop: () => props.moveCard,
        collect: (mon: any) => ({
            isOver: !!mon.isOver(),
            canDrop: !!mon.canDrop()
        })
      })

    return (
        <ul ref={drop} className="wf-lane" >
            <p>Number of cards: {numberOfCards}</p>
            {props.cards.forEach(card => {
                <WorkflowCard {...card} />
            })}
                
        </ul >
    )
        
        
}

export default connect(
    (state: WorkflowBoardStore.WorkflowBoardState) =>
        WorkflowBoardStore.actionCreators
)(WorkflowLane);