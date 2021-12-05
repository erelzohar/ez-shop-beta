import CartItemModel from "../models/cart-item-model";


// cartItemss State: 
export class CartItemsState {
    public cartItems: CartItemModel[] = [];
}

// cartItems Action Types:
export enum CartItemActionType {
    cartItemsDownloaded = "cartItemsDownloaded",
    cartItemAdded = "cartItemAdded",
    cartItemDeleted = "cartItemDeleted",
    allCartItemsDeleted = "allcartItemsDeleted"
}

// CartItems Action: 
export interface CartItemsAction {
    type: CartItemActionType;
    payload: any;

}

// cartItems Action Creators: 
export function cartItemsDownloadedAction(cartItems: CartItemModel[]): CartItemsAction {
    return { type: CartItemActionType.cartItemsDownloaded, payload: cartItems };
}
export function cartItemAddedAction(cartItems: CartItemModel): CartItemsAction {
    return { type: CartItemActionType.cartItemAdded, payload: cartItems };
}
export function cartItemDeletedAction(id: string): CartItemsAction {
    return { type: CartItemActionType.cartItemDeleted, payload: id };
}
export function allCartItemsDeletedAction(cartId: string): CartItemsAction {
    return { type: CartItemActionType.allCartItemsDeleted, payload: cartId };
}

// cartItemss Reducer:
export function cartItemsReducer(currentState: CartItemsState = new CartItemsState(), action: CartItemsAction): CartItemsState {

    const newState = { ...currentState };

    switch (action.type) {
        case CartItemActionType.cartItemsDownloaded: // Here payload is all cartItemss (CartItemsModel[])
            newState.cartItems = action.payload;
            break;
        case CartItemActionType.cartItemAdded: // Here payload is the added cartItems (CartItemsModel)
            newState.cartItems.push(action.payload);
            break;

        case CartItemActionType.cartItemDeleted: {
            const index = newState.cartItems.findIndex(p => p._id === action.payload);
            newState.cartItems.splice(index, 1);
            break;
        }

        case CartItemActionType.allCartItemsDeleted: {
            newState.cartItems = [];
        }
    }

    return newState;
}