import { Action, Reducer } from 'redux';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface WorkflowBoardState {
    lanes: Array<Lane>,
    cards: Array<Card>,
    laneOrder: Array<string>
}
export interface Lane {
    id: string,
    title: string,
    cards: Array<string>
}
export interface Card {
    id: string,
    content: string
}


// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

export interface UpdateCardAction {
    type: 'UPDATE_CARD';
    updatedCard: Card;
}

export interface UpdateLaneAction {
    type: 'UPDATE_LANE';
    updatedLane: Lane;
}

export interface UpdateStateAction {
    type: 'UPDATE_STATE';
    newState: WorkflowBoardState;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type KnownAction = UpdateCardAction | UpdateLaneAction | UpdateStateAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    updateCard: (updatedCard: Card) => ({ type: 'UPDATE_CARD', updatedCard: updatedCard } as UpdateCardAction),
    updateLane: (updatedLane: Lane) => ({ type: 'UPDATE_LANE', updatedLane: updatedLane} as UpdateLaneAction),
    updateState: (newState: WorkflowBoardState) => ({ type: 'UPDATE_STATE', newState: newState} as UpdateStateAction)
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer: Reducer<WorkflowBoardState> = (state: WorkflowBoardState | undefined, incomingAction: Action): WorkflowBoardState => {
    if (state === undefined) {
        return {
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
    }
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'UPDATE_CARD':
            var newState = {
                ...state
            }
            newState.cards[action.updatedCard.id] = { ...action.updatedCard }
            return newState
        case 'UPDATE_LANE':
            var newState = {
                ...state
            }
            newState.lanes[action.updatedLane.id] = { ...action.updatedLane }
            return newState
        case 'UPDATE_STATE':
            return action.newState
        default:
            return state;
    }
};


