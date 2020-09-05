import { Action, Reducer } from 'redux';
import { isArray } from 'util';

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
    description: string,
    laneId: string
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

export interface MoveCardAction {
    type: 'MOVE_CARD';
    oldState: Array<Lane>;
    cardId: string;
    oldLaneId: string;
    newLaneId: string;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type KnownAction = MoveCardAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    moveCard: (oldState: Array<Lane>, cardId: string, oldLaneId: string, newLaneId: string) => ({ type: 'MOVE_CARD', oldState: oldState, cardId: cardId, oldLaneId: oldLaneId, newLaneId: newLaneId} as MoveCardAction)
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
        case 'MOVE_CARD':
            {
                var cardToMove = <Card>{};
                var updatedState = pullOutCardToMove(action.oldState, cardToMove, action.oldLaneId, action.cardId)
                cardToMove.laneId = action.newLaneId;
                updatedState = addCardAtNewLocation(updatedState, cardToMove, action.newLaneId);
                
            }
            
        default:
            return state;
    }
};

function pullOutCardToMove(state: Array<Lane>, cardToMove: Card, oldLaneId: string, cardId: string): Array<Lane>  {
    return state.map(lane => {
        //find lane where card used to be
        if (lane.id === oldLaneId) {
            //pull out card to move
            lane.cards = lane.cards.filter((card) => {
                if (card.id !== cardId) {
                    return true;
                }
                cardToMove = { ...card };
                return false;
            });
            
        }
        return lane;
    });
}

function addCardAtNewLocation(state: Array<Lane>, cardToMove: Card, newLaneId: string) {
    return state.map(lane => {
        if (lane.id === newLaneId) {
            lane.cards.push(cardToMove)
        }
        return lane;
    })
}
