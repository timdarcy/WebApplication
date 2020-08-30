import { Action, Reducer } from 'redux';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface WorkflowBoardState {
    lanes: Array<Lane>;
}
export interface Lane {
    id: string,
    title: string,
    cards: Array<Card>
}
export interface Card {
    id: string,
    title: string,
    description: string
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

export interface UpdateWorkflowBoardAction {
    type: 'UPDATE_WORKFLOW_BOARD';
    newLaneData: Array<Lane>;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type KnownAction = UpdateWorkflowBoardAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    updateLanes: (newLaneData: Array<Lane>) => ({ type: 'UPDATE_WORKFLOW_BOARD', newLaneData: newLaneData } as UpdateWorkflowBoardAction)
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer: Reducer<WorkflowBoardState> = (state: WorkflowBoardState | undefined, incomingAction: Action): WorkflowBoardState => {
    if (state === undefined) {
        return {
            lanes: [{
                id: "Lane 1",
                title: "New 1",
                cards: [{
                    id: "Card 1",
                    title:"Card 1",
                    description: "this is card 1"
                }]
            }]
        }
    }
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'UPDATE_WORKFLOW_BOARD':
            return { lanes: action.newLaneData};
        default:
            return state;
    }
};
