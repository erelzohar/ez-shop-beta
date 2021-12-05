class OrderModel{
    public _id:string;
    public cartId:string;
    public customerId:string;
    public finalPrice:number;
    public city:string;
    public street:string;
    public orderDate:string;
    public dateToDeliver:string;
    public creditCard:number;

    public static convertToFormData(order: OrderModel): FormData {
        const myFormData = new FormData();
        myFormData.append("cartId", order.cartId);
        myFormData.append("customerId", order.customerId);
        myFormData.append("finalPrice", order.finalPrice.toString());
        myFormData.append("city", order.city);
        myFormData.append("street", order.street);
        myFormData.append("orderDate", order.orderDate);
        myFormData.append("dateToDeliver", order.dateToDeliver);
        myFormData.append("creditCard", order.creditCard.toString());
        return myFormData;
    }
}

export default OrderModel;