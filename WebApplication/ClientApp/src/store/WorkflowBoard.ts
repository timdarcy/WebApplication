import { Action, Reducer } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import { CardValues } from '../components/WorkFlowFeature/CardModal';
import { LaneValues } from '../components/WorkFlowFeature/LaneModal';

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
    cardIds: Array<string>
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
    values: CardValues;
}

export interface DeleteCardAction {
    type: 'DELETE_CARD';
    cardId: string;
    laneId: string;
}

export interface UpdateLaneAction {
    type: 'UPDATE_LANE';
    updatedLane: Lane;
}

export interface AddNewLaneAction {
    type: 'ADD_NEW_LANE';
    values: LaneValues;
}

export interface DeleteLane {
    type: 'DELETE_LANE';
    laneId: string;
}

export interface UpdateStateAction {
    type: 'UPDATE_STATE';
    newState: WorkflowBoardState;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type KnownAction = UpdateCardAction | UpdateLaneAction | UpdateStateAction | AddNewCardAction | DeleteCardAction | AddNewLaneAction | DeleteLane;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    updateCard: (updatedCard: Card) => ({ type: 'UPDATE_CARD', updatedCard: updatedCard } as UpdateCardAction),
    updateLane: (updatedLane: Lane) => ({ type: 'UPDATE_LANE', updatedLane: updatedLane} as UpdateLaneAction),
    updateState: (newState: WorkflowBoardState) => ({ type: 'UPDATE_STATE', newState: newState } as UpdateStateAction),
    deleteCard: (cardId: string, laneId: string) => ({ type: 'DELETE_CARD', cardId: cardId, laneId: laneId} as DeleteCardAction),
    addNewCard: (laneId: string, values: CardValues) => ({ type: 'ADD_NEW_CARD', laneId: laneId, values: values } as AddNewCardAction),
    addNewLane: (values: LaneValues) => ({ type: 'ADD_NEW_LANE', values: values } as AddNewLaneAction),
    deleteLane: (laneId: string) => ({ type: 'DELETE_LANE', laneId: laneId} as DeleteLane)
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const createNewCard = (values: CardValues) => {
    return <Card>{
        id: uuidv4(),
        title: values.title,
        content: values.content
    }
}

const createNewLane = (values: LaneValues) => {
    return <Lane>{
        id: uuidv4(),
        title: values.title,
        cardIds: []
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
            var newCard = createNewCard(action.values);
            var newState = {
                ...state
            }
            newState.cards[newCard.id] = newCard;
            newState.lanes[action.laneId].cardIds.push(newCard.id)
            return newState;
        case 'DELETE_CARD':
            var newState = { ...state }
            delete newState.cards[action.cardId];
            var index = newState.lanes[action.laneId].cardIds.indexOf(action.cardId);
            newState.lanes[action.laneId].cardIds.splice(index, 1);
            return newState;
        case 'ADD_NEW_LANE':
            var newState = { ...state }
            var newLane = createNewLane(action.values)
            newState.lanes[newLane.id] = newLane;
            newState.laneOrder.push(newLane.id);
            return newState;
        case 'DELETE_LANE':
            var newState = { ...state }
            delete newState.lanes[action.laneId]
            var laneIndex = newState.laneOrder.indexOf(action.laneId);
            newState.laneOrder.splice(laneIndex, 1);
            return newState
        default:
            return state;
    }
};


