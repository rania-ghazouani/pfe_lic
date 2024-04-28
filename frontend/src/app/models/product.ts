import { categoryProduct } from './category';
import { user } from './user';

export interface product{
    productId: number,
    prodEnteredId: number,
    productName: String,
    productDescription: String,
    productQuantity: number,
    productPrice: number,
    productMin: number,
    isArchived: Boolean,
    creationDate: Date,
    updateDate: Date,
    user: user["userName"],
    category: categoryProduct["categoryName"]
}