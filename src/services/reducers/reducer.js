const initialState = {
    ingredients: [],
    constructorIngredients: [],
    currentIngredient: {},
    currentOrder: {}
}

export const reducer = (state = initialState, action) => {
    switch(action.type){
        case '': return () => console.log(1);
        default: return state;
    }
}