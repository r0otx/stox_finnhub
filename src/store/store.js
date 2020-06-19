import {createStore} from "redux";
import {profileReducer} from "./profile-reducer";

export const store = createStore(profileReducer);

window.store = store;