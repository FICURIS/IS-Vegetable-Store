import CartItem from "./CartItem.js";
import fileService from '../Post/fileService.js';

class CartItemService{
    async create(cartItem, picture) {
            const fileName = fileService.saveFile(picture);
            const createdCartItem = await CartItem.create({...cartItem, picture: fileName});
            return createdCartItem;
    }

    async getAll() {
            const cartItems = await CartItem.find();
            return cartItems;
    }

    async getOne(id) {
            if (!id) {
                throw new Error('не указан ID');
            }
            const cartItem = await CartItem.findById(id)
            return cartItem;
    }
    async update(cartItem) {
            if(!cartItem._id) {
                throw new Error('не указан ID');
            }
            const updatedCartItem = await CartItem.findByIdAndUpdate(cartItem._id, cartItem, {new: true})
            return updatedCartItem;
    }
    async delete(id) {
            if (!id) {
                throw new Error('не указан ID');
            }
            const cartItem = await CartItem.findByIdAndDelete(id)
            return cartItem;
    }
}

export default new CartItemService();