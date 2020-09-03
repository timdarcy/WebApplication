import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as WorkflowBoardStore from '../../store/WorkflowBoard';
import WorkflowCard from './WorkflowCard';
import { DraggableTypes } from './DraggableTypeConstants';
import { useDrop } from 'react-dnd'


type Props = 
    WorkflowBoardStore.Lane 

interface State {
    

}

const WorkflowLane: React.FC<Props> = () => {
    const [numberOfCards, setNumberOfCards] = useState(1);

    const moveCard = () => {
        setNumberOfCards(numberOfCards + 1);
    }

    const [{ isOver }, drop] = useDrop({
        accept: DraggableTypes.CARD,
        drop: () => moveCard(),
        collect: (mon: any) => ({
            isOver: !!mon.isOver(),
            canDrop: !!mon.canDrop()
        })
      })

    return (
        <ul ref={drop} className="wf-lane" >
            <p>Number of cards: {numberOfCards}</p>
            <WorkflowCard/>
                
        </ul >
    )
        
        
}

export default WorkflowLane;