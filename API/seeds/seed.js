import mongoose from 'mongoose';

import Address from '../modules/Address/Address.js';
import Cart from '../modules/Cart/Cart.js';
import CartItem from '../modules/CartItem/CartItem.js';
import Categories from '../modules/Categories/Categories.js';
import OrderItems from '../modules/OrderItems/OrderItems.js';
import Orders from '../modules/Orders/Orders.js';
import OrdersStatus from '../modules/OrdersStatus/OrdersStatus.js';
import ProductDescription from '../modules/ProductDescription/ProductDescription.js';
import ProductImages from '../modules/ProductImages/ProductImages.js';
import Products from '../modules/Products/Products.js';
import Reviews from '../modules/Reviews/Reviews.js';
import Roles from '../modules/Roles/Roles.js';
import Users from '../modules/Users/Users.js';
import UsersRoles from '../modules/UsersRoles/UsersRoles.js';

const DB_URL = process.env.DB_URL || 'mongodb://Ficuris:Js261710@ac-t3dojwh-shard-00-00.nqshlag.mongodb.net:27017,ac-t3dojwh-shard-00-01.nqshlag.mongodb.net:27017,ac-t3dojwh-shard-00-02.nqshlag.mongodb.net:27017/?ssl=true&replicaSet=atlas-12ev22-shard-0&authSource=admin&appName=Vegetables';

const collections = [
    Reviews,
    OrderItems,
    Orders,
    CartItem,
    Cart,
    Address,
    UsersRoles,
    Users,
    ProductImages,
    ProductDescription,
    Products,
    Categories,
    OrdersStatus,
    Roles
];

const categoryData = [
    {
        Name: 'Овощи',
        Description: 'Свежие овощи для салатов, супов и горячих блюд.'
    },
    {
        Name: 'Фрукты',
        Description: 'Сезонные фрукты для полезных перекусов и десертов.'
    },
    {
        Name: 'Зелень',
        Description: 'Ароматная зелень для блюд и сервировки.'
    },
    {
        Name: 'Ягоды',
        Description: 'Свежие ягоды для завтраков, выпечки и напитков.'
    }
];

const productData = [
    {
        Name: 'Помидоры черри',
        Quantity: 60,
        Price: 180,
        Category: 'Овощи',
        Variety: 'Черри красные',
        Text: 'Сладкие плотные томаты, подходят для салатов и запекания.',
        ImageURL: '/images/tomato-cherry.jpg'
    },
    {
        Name: 'Огурцы короткоплодные',
        Quantity: 80,
        Price: 95,
        Category: 'Овощи',
        Variety: 'Хрустящие',
        Text: 'Свежие огурцы с тонкой кожицей для салатов и закусок.',
        ImageURL: '/images/cucumber.jpg'
    },
    {
        Name: 'Картофель молодой',
        Quantity: 140,
        Price: 65,
        Category: 'Овощи',
        Variety: 'Молодой урожай',
        Text: 'Универсальный картофель для варки, жарки и запекания.',
        ImageURL: '/images/potato.jpg'
    },
    {
        Name: 'Морковь мытая',
        Quantity: 100,
        Price: 70,
        Category: 'Овощи',
        Variety: 'Сладкая',
        Text: 'Сочная морковь для супов, гарниров и свежевыжатого сока.',
        ImageURL: '/images/carrot.jpg'
    },
    {
        Name: 'Яблоки Гала',
        Quantity: 90,
        Price: 120,
        Category: 'Фрукты',
        Variety: 'Гала',
        Text: 'Сладкие ароматные яблоки среднего размера.',
        ImageURL: '/images/apple-gala.jpg'
    },
    {
        Name: 'Бананы',
        Quantity: 75,
        Price: 110,
        Category: 'Фрукты',
        Variety: 'Спелые',
        Text: 'Мягкие сладкие бананы для завтраков и смузи.',
        ImageURL: '/images/banana.jpg'
    },
    {
        Name: 'Укроп',
        Quantity: 45,
        Price: 35,
        Category: 'Зелень',
        Variety: 'Пучок',
        Text: 'Свежий укроп для супов, салатов и маринадов.',
        ImageURL: '/images/dill.jpg'
    },
    {
        Name: 'Петрушка',
        Quantity: 40,
        Price: 35,
        Category: 'Зелень',
        Variety: 'Пучок',
        Text: 'Ароматная петрушка для горячих и холодных блюд.',
        ImageURL: '/images/parsley.jpg'
    },
    {
        Name: 'Клубника',
        Quantity: 35,
        Price: 260,
        Category: 'Ягоды',
        Variety: 'Садовая',
        Text: 'Сладкая клубника для десертов, каш и домашних лимонадов.',
        ImageURL: '/images/strawberry.jpg'
    },
    {
        Name: 'Голубика',
        Quantity: 25,
        Price: 320,
        Category: 'Ягоды',
        Variety: 'Крупная',
        Text: 'Свежая голубика с плотной ягодой и мягкой сладостью.',
        ImageURL: '/images/blueberry.jpg'
    }
];

async function clearDatabase() {
    for (const collection of collections) {
        await collection.deleteMany({});
    }
}

async function seedDatabase() {
    await mongoose.connect(DB_URL);

    await clearDatabase();

    const roles = await Roles.insertMany([
        { Name: 'admin' },
        { Name: 'customer' }
    ]);

    const statuses = await OrdersStatus.insertMany([
        { Name: 'Новый' },
        { Name: 'В обработке' },
        { Name: 'Доставлен' },
        { Name: 'Отменен' }
    ]);

    const categories = await Categories.insertMany(categoryData);
    const categoryByName = new Map(categories.map((category) => [category.Name, category]));

    const products = await Products.insertMany(productData.map((product) => ({
        Name: product.Name,
        Quantity: product.Quantity,
        Price: product.Price,
        IdCategories: categoryByName.get(product.Category)._id
    })));

    const productByName = new Map(products.map((product) => [product.Name, product]));

    await ProductDescription.insertMany(productData.map((product) => ({
        IdProducts: productByName.get(product.Name)._id,
        Variety: product.Variety,
        Text: product.Text
    })));

    await ProductImages.insertMany(productData.map((product) => ({
        IdProducts: productByName.get(product.Name)._id,
        ImageURL: product.ImageURL
    })));

    const users = await Users.insertMany([
        {
            Username: 'admin',
            Password: 'admin123',
            Email: 'admin@vegetable-store.local',
            Phone: '+79990000001'
        },
        {
            Username: 'ivan',
            Password: 'ivan123',
            Email: 'ivan@example.com',
            Phone: '+79990000002'
        }
    ]);

    const [admin, customer] = users;
    const [adminRole, customerRole] = roles;

    await UsersRoles.insertMany([
        { IdUsers: admin._id, IdRoles: adminRole._id },
        { IdUsers: customer._id, IdRoles: customerRole._id }
    ]);

    const address = await Address.create({
        IdUsers: customer._id,
        City: 'Новосибирск',
        Street: 'Красный проспект',
        House: '25',
        Apartment: '14'
    });

    const cart = await Cart.create({ IdUsers: customer._id });
    const cartProducts = [
        { product: productByName.get('Помидоры черри'), quantity: 2 },
        { product: productByName.get('Огурцы короткоплодные'), quantity: 3 },
        { product: productByName.get('Клубника'), quantity: 1 }
    ];

    const cartItems = await CartItem.insertMany(cartProducts.map(({ product, quantity }) => ({
        IdCart: cart._id,
        IdProducts: product._id,
        Quantity: quantity,
        PriceAtMoment: product.Price
    })));

    const totalPrice = cartItems.reduce((sum, item) => sum + item.Quantity * item.PriceAtMoment, 0);
    const deliveredStatus = statuses.find((status) => status.Name === 'Доставлен');
    const order = await Orders.create({
        IdUsers: customer._id,
        IdOrdersStatus: deliveredStatus._id,
        IdAddress: address._id,
        DateOrder: new Date('2026-06-20T10:30:00.000Z'),
        TotalPrice: totalPrice
    });

    await OrderItems.insertMany(cartItems.map((item) => ({
        IdOrders: order._id,
        IdCartItem: item._id,
        Quantity: item.Quantity,
        Price: item.PriceAtMoment
    })));

    await Reviews.insertMany([
        {
            IdProducts: productByName.get('Помидоры черри')._id,
            IdOrders: order._id,
            Date: new Date('2026-06-21T09:00:00.000Z'),
            Rating: 5,
            Text: 'Очень сладкие и свежие, отлично подошли для салата.'
        },
        {
            IdProducts: productByName.get('Клубника')._id,
            IdOrders: order._id,
            Date: new Date('2026-06-21T09:15:00.000Z'),
            Rating: 5,
            Text: 'Ягоды крупные, ароматные, без лишней влаги.'
        }
    ]);

    console.log('Database seeded successfully');
    console.log(`Categories: ${categories.length}`);
    console.log(`Products: ${products.length}`);
    console.log(`Users: ${users.length}`);
    console.log(`Order total: ${totalPrice}`);
}

seedDatabase()
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await mongoose.disconnect();
    });
