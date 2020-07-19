import deckReducer from "./deckReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
    decks: deckReducer,
})

export default rootReducer