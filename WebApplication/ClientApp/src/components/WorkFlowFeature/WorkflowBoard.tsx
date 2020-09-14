import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store'
import * as WorkflowBoardStore from '../../store/WorkflowBoard'
import WorkflowLane from './WorkflowLane'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

type Props = 
    WorkflowBoardStore.WorkflowBoardState &
    typeof WorkflowBoardStore.actionCreators

interface State {
    

}

const data = {
    lanes: [
        {
            id: 'lane1',
            title: 'Planned Tasks',
            label: '2/2',
            cards: [
                { id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins' },
                { id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: { sha: 'be312a1' } }
            ]
        },
        {
            id: 'lane2',
            title: 'Completed',
            label: '0/0',
            cards: []
        }
    ]
}

class WorkflowBoard extends React.Component<Props>{
    
    render() {
        return (
            <>
                {this.props.lanes.forEach(lane => {
                    <WorkflowLane {...lane}/>
                })}
            </>

            )
    }
}

export default connect(
    (state: WorkflowBoardStore.WorkflowBoardState) => state,
    WorkflowBoardStore.actionCreators
)(WorkflowBoard);