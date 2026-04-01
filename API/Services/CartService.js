import Cart from '../Models/Cart';
import CartItem from '../Models/CartItem';

class CartService {
    async create(userId) {
        try {
            return await Cart.create({ IdUsers: userId });
        } catch (e) {
            throw new Error(`Ошибка создания корзины: ${e.message}`);
        }
    }

    async getByUserId(userId) {
        try {
            return await Cart.findOne({ IdUsers: userId });
        } catch (e) {
            throw new Error(`Ошибка получения корзины: ${e.message}`);
        }
    }

    async getCartItems(cartId) {
        try {
            return await CartItem.find({ IdCart: cartId })
                .populate('IdProducts');
        } catch (e) {
            throw new Error(`Ошибка получения товаров корзины: ${e.message}`);
        }
    }

    async addItem(cartId, productId, quantity, price) {
        try {
            return await CartItem.create({
                IdCart: cartId,
                IdProducts: productId,
                Quantity: quantity,
                PriceAtMoment: price
            });
        } catch (e) {
            throw new Error(`Ошибка добавления товара в корзину: ${e.message}`);
        }
    }

    async removeItem(itemId) {
        try {
            return await CartItem.findByIdAndDelete(itemId);
        } catch (e) {
            throw new Error(`Ошибка удаления товара из корзины: ${e.message}`);
        }
    }

    async updateItemQuantity(itemId, quantity) {
        try {
            return await CartItem.findByIdAndUpdate(itemId, { Quantity: quantity }, { new: true });
        } catch (e) {
            throw new Error(`Ошибка обновления количества товара: ${e.message}`);
        }
    }

    async clearCart(cartId) {
        try {
            return await CartItem.deleteMany({ IdCart: cartId });
        } catch (e) {
            throw new Error(`Ошибка очистки корзины: ${e.message}`);
        }
    }
}

export default new CartService();