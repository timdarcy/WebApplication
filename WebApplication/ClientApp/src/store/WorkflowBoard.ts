import { Action, Reducer } from 'redux';
import { v4 as uuidv4 } from 'uuid';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface WorkflowBoardState {
    lanes: any,
    cards: any,
    laneOrder: Array<string>
}
export interface Lane {
    id: string,
    title: string,
    cards: Array<string>
}
export interface Card {
    id: string,
    title: string,
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

export interface AddNewCardAction {
    type: 'ADD_NEW_CARD';
    laneId: string;
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
export type KnownAction = UpdateCardAction | UpdateLaneAction | UpdateStateAction | AddNewCardAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    updateCard: (updatedCard: Card) => ({ type: 'UPDATE_CARD', updatedCard: updatedCard } as UpdateCardAction),
    updateLane: (updatedLane: Lane) => ({ type: 'UPDATE_LANE', updatedLane: updatedLane} as UpdateLaneAction),
    updateState: (newState: WorkflowBoardState) => ({ type: 'UPDATE_STATE', newState: newState } as UpdateStateAction),

    addNewCard: (laneId: string) => ({ type: 'ADD_NEW_CARD', laneId: laneId } as AddNewCardAction)
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const createNewCard = () => {
    return <Card>{
        id: uuidv4(),
        title: 'add a title',
        content: 'add some content'
    }
}

export const reducer: Reducer<WorkflowBoardState> = (state: WorkflowBoardState | undefined, incomingAction: Action): WorkflowBoardState => {
    if (state === undefined) {
        return {
            cards: {
                
            },
            lanes: {
                'lane-1': {
                    id: 'lane-1',
                    title: 'Lane 1 title',
                    cardIds: []
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
        case 'ADD_NEW_CARD':
            var newCard = createNewCard();
            var newState = {
                ...state
            }
            newState.cards[newCard.id] = newCard;
            newState.lanes[action.laneId].cardIds.push(newCard.id)
            return newState;

        default:
            return state;
    }
};


