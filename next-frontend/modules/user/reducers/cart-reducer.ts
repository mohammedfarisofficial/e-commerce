export interface CartItem {
    id: string;
    name: string;
    slug?: string;
    price: number;
    originalPrice?: number;
    image: string;
    quantity: number;
    stock: number;
}

export interface CartState {
    items: CartItem[];
    total: number;
}

export type CartAction =
    | { type: "SET_CART"; payload: { items: CartItem[]; total: number } }
    | { type: "ADD_ITEM"; payload: CartItem }
    | { type: "REMOVE_ITEM"; payload: { id: string } }
    | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
    | { type: "CLEAR_CART" };

export const initialState: CartState = {
    items: [],
    total: 0,
};

export const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case "SET_CART":
            return {
                items: action.payload.items,
                total: action.payload.total,
            };
        case "ADD_ITEM": {
            const existingItem = state.items.find((item) => item.id === action.payload.id);
            if (existingItem) {
                const updatedItems = state.items.map((item) =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + action.payload.quantity }
                        : item
                );
                return {
                    ...state,
                    items: updatedItems,
                    total: state.total + action.payload.price * action.payload.quantity,
                };
            }
            return {
                ...state,
                items: [...state.items, action.payload],
                total: state.total + action.payload.price * action.payload.quantity,
            };
        }
        case "REMOVE_ITEM": {
            const itemToRemove = state.items.find((item) => item.id === action.payload.id);
            if (!itemToRemove) return state;
            return {
                ...state,
                items: state.items.filter((item) => item.id !== action.payload.id),
                total: state.total - itemToRemove.price * itemToRemove.quantity,
            };
        }
        case "UPDATE_QUANTITY": {
            const itemToUpdate = state.items.find((item) => item.id === action.payload.id);
            if (!itemToUpdate) return state;
            const quantityDifference = action.payload.quantity - itemToUpdate.quantity;
            return {
                ...state,
                items: state.items.map((item) =>
                    item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
                ),
                total: state.total + itemToUpdate.price * quantityDifference,
            };
        }
        case "CLEAR_CART":
            return initialState;
        default:
            return state;
    }
};
