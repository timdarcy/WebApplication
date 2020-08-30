import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store'
import * as WorkflowBoardStore from '../store/WorkflowBoard'


type Props = 
    WorkflowBoardStore.Lane &
    typeof WorkflowBoardStore.actionCreators

interface State {
    

}

class WorkflowLane extends React.Component<Props>{

    renderCard = () => {
        return (
            <div>

            </div>
            )
    }

    render() {
        return (
            <ul className="lane" >
            
            </ul >
        )
        
        
    }
}

export default connect(
    (state: ApplicationState) => state.board,
    WorkflowBoardStore.actionCreators
)(WorkflowLane);