const ADD_PROFILE = "ADD_PROFILE";

let initialState = {
    profile: {}
}

export let profileReducer = (state = initialState, action) => {
    debugger
    switch (action.type) {
        case ADD_PROFILE:
            return {
                ...state,
                profile: action.data
            };
        default:
            return state;
    }
}

export const addProfile = (data) => ({
    type: ADD_PROFILE, data
});