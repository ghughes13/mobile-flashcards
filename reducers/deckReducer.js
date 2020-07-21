const deckStateModifier = (state = Object.values(require('../flashCardData.json')), action) => {
    action.text ? state = action.text : state
    switch (action.type) {
        case "CREATE_DECK":
            return state
        case "DELETE_DECK":
            return state
        case "ADD_CARD":
            return state
        default: 
            return state
    }
};

export default deckStateModifier;