export const initialState = {
    basket: [],
    user: null,
    addressData: {},
};

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_BASKET":
            return {
                ...state,
                basket: [...state.basket, action.item],
            };

        case 'ROMOVE_FROM_BASKET':
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            )
            let newBasket = [...state.basket];
            if (index >= 0) {
                newBasket.splice(index, 1);
            } else {
                console.warn(`can't romove from basket`)
            }

            return {
                ...state,
                basket: newBasket
            }

        case 'proceed_to_buy': {
            return {
                ...state,
                basket: []
            }
        }
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }

        case 'address_data':
            return {
                ...state,
                addressData: { ...action.item }
            }

        default:
            return state;
    }
};

export default reducer;
