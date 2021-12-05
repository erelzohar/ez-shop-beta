class ProductModel {

    public _id: string;
    public productName: string;
    public price: number;
    public categoryId: string;
    public imageName : string;
    public image: FileList;

    public static convertToFormData(product: ProductModel): FormData {
        const myFormData = new FormData();
        myFormData.append("productName", product.productName);
        myFormData.append("price", product.price.toString());
        myFormData.append("categoryId", product.categoryId);
        if(product.image) myFormData.append("image", product.image.item(0));
        return myFormData;
    }

}

export default ProductModel;