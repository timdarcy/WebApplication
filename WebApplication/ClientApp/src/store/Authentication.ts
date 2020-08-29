import { Action, Reducer } from 'redux';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface AuthenticationState {
    authToken: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

export interface UpdateTokenAction {
    type: 'UPDATE_TOKEN';
    newToken: string;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type KnownAction = UpdateTokenAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    updateToken: (newToken: string) => ({ type: 'UPDATE_TOKEN', newToken: newToken } as UpdateTokenAction)
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer: Reducer<AuthenticationState> = (state: AuthenticationState | undefined, incomingAction: Action): AuthenticationState => {
    if (state === undefined) {
        return { authToken: "" };
    }
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'UPDATE_TOKEN':
            console.log(action.newToken);
            return { authToken: action.newToken };
        default:
            return state;
    }
};
