import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as WorkflowBoardStore from '../../store/WorkflowBoard';
import { useDrag } from 'react-dnd';
import { DraggableTypes } from './DraggableTypeConstants';
import classNames from 'classnames';


type Props = WorkflowBoardStore.Card



const WorkflowCard: React.FC<Props> = (props) =>{

    

    const [{ isDragging }, drag] = useDrag({
        item: {
            type: DraggableTypes.CARD,
            id: props.id,
            laneId: props.laneId
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
          })
    });

    return (
        <div ref={drag} className={classNames({"wf-card": true, "wf-card-dragging": isDragging})}>
            <h3>Id: {props.id} - Title: {props.title}</h3>
            <p>Description: {props.description}</p>
        </div>
    )
        
        

}

export default WorkflowCard;