 class CartItemModel{
    public _id:string;
    public productId:string;
    public cartId:string;
    public productName:string;
    public amount:number;
    public price:number;

    public static convertToFormData(cartItem:CartItemModel): FormData {
        const myFormData = new FormData();
        myFormData.append("productName", cartItem.productName);
        myFormData.append("price", cartItem.price.toString());
        myFormData.append("productId", cartItem.productId);
        myFormData.append("amount", cartItem.amount?.toString());
        myFormData.append("cartId", cartItem.cartId.toString());
        return myFormData;
    }


}

export default CartItemModel;
