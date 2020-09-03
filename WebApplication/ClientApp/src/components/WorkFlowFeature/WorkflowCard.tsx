import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as WorkflowBoardStore from '../../store/WorkflowBoard';
import { useDrag } from 'react-dnd';
import { DraggableTypes } from './DraggableTypeConstants';
import classNames from 'classnames';


interface Props {
    text: string;
}

interface State {
    

}

const WorkflowCard: React.FC<Props> = () =>{

    


    const [{ isDragging }, drag] = useDrag({
        item: { type: DraggableTypes.CARD },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
          })
    });

    return (
        <div ref={drag} className={classNames({"wf-card": true, "wf-card-dragging": isDragging})}>

        </div>
    )
        
        

}

export default WorkflowCard;