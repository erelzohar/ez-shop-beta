import ProductModel from "./product.model";

class CategoryModel{
    public _id:string;
    public categoryName:string;
    public products:ProductModel[];
}

export default CategoryModel;