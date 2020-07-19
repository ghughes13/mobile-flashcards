export const createDeck = (currentDeckState, newDeckTitle) => {
    let title = [ ...currentDeckState, {'title' : newDeckTitle} ]
    return {
        type: "CREATE_DECK",
        text: title
    }
}

export const deleteDeck = (oldDeckState) => {
    let newDeckState = [...oldDeckState]
    return {
        type: "DELETE_DECK",
        text: newDeckState
    }
}

export const addCardToDeck = (oldDeckState) => {
    let newDeckState = [...oldDeckState]
    return {
        type: "ADD_CARD",
        text: newDeckState,
    }
}