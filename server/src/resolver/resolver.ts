import userResolver from "./user-resolver";
import productResolver from "./product-resolver";
import authResolver from "./auth-resolver";
import CustomType from "../custom-type";
import { GraphQLResolveInfo } from 'graphql';
// const users = [
//     {
//         "_id": { "$oid": "6242e98046b29a041932d81b" },
//         "name": "John Doe",
//         "roles": ["SELLER"],
//         "password": "$2b$10$D4ZAb4P9npIaAv7MT1/kzO6.0U6BvU6BpRe6nzwRZnODxlY9vG1q2",
//         "permissions": ["create-product", "edit-product", "delete-product"]
//     },
//     {
//         "_id": { "$oid": "6242e9be46b29a041932d81c" },
//         "name": "Jane Doe",
//         "roles": ["ADMIN"],
//         "password": "$2b$10$D4ZAb4P9npIaAv7MT1/kzO6.0U6BvU6BpRe6nzwRZnODxlY9vG1q2",
//         "permissions": ["block-user", "delete-product"]
//     },
//     {
//         "_id": { "$oid": "6242e9f646b29a041932d81d" },
//         "name": "Mike Smith",
//         "roles": ["SELLER"],
//         "password": "$2b$10$D4ZAb4P9npIaAv7MT1/kzO6.0U6BvU6BpRe6nzwRZnODxlY9vG1q2",
//         "permissions": ["create-product", "edit-product", "delete-product"]
//     },
//     {
//         "_id": { "$oid": "6242ea1246b29a041932d81e" },
//         "name": "Emily Johnson",
//         "roles": ["SELLER"],
//         "password": "$2b$10$D4ZAb4P9npIaAv7MT1/kzO6.0U6BvU6BpRe6nzwRZnODxlY9vG1q2",
//         "permissions": ["create-product", "edit-product", "delete-product"]
//     },
//     {
//         "_id": { "$oid": "6242ea2d46b29a041932d81f" },
//         "name": "David Brown",
//         "roles": ["SELLER"],
//         "password": "$2b$10$D4ZAb4P9npIaAv7MT1/kzO6.0U6BvU6BpRe6nzwRZnODxlY9vG1q2",
//         "permissions": ["create-product", "edit-product", "delete-product"]
//     },
//     {
//         "_id": { "$oid": "6242ea4646b29a041932d820" },
//         "name": "Alex Davis",
//         "roles": ["GUEST"],
//         "password": "$2b$10$D4ZAb4P9npIaAv7MT1/kzO6.0U6BvU6BpRe6nzwRZnODxlY9vG1q2",
//         "permissions": []
//     },
//     {
//         "_id": { "$oid": "6242ea5946b29a041932d821" },
//         "name": "Anna Lee",
//         "roles": ["GUEST"],
//         "password": "$2b$10$D4ZAb4P9npIaAv7MT1/kzO6.0U6BvU6BpRe6nzwRZnODxlY9vG1q2",
//         "permissions": []
//     }
// ]

// const _roles = [
//     {
//         "_id": { "$oid": "6242ea7c46b29a041932d822" },
//         "name": "ADMIN",
//         "permissions": ["block-user", "delete-product"]
//     },
//     {
//         "_id": { "$oid": "6242ea9146b29a041932d823" },
//         "name": "SELLER",
//         "permissions": ["create-product", "edit-product", "delete-product"]
//     },
//     {
//         "_id": { "$oid": "6242eaa846b29a041932d824" },
//         "name": "GUEST",
//         "permissions": []
//     }
// ]

// const products = [
//     {
//         "_id": { "$oid": "6242eabc46b29a041932d825" },
//         "name": "LG Smart TV",
//         "category": "Electronics",
//         "user_id": { "$oid": "6242e98046b29a041932d81b" }
//     },
//     {
//         "_id": { "$oid": "6242eadf46b29a041932d826" },
//         "name": "Nike Air Force 1",
//         "category": "Shoes",
//         "user_id": { "$oid": "6242e9f646b29a041932d81d" }
//     },
//     {
//         "_id": { "$oid": "6242eb0346b29a041932d827" },
//         "name": "Macbook Pro",
//         "category": "Computers",
//         "user_id": { "$oid": "6242ea1246b29a041932d81e" }
//     },
//     {
//         "_id": { "$oid": "6242eb1c46b29a041932d828" },
//         "name": "Samsung Galaxy S21",
//         "category": "Phones",
//         "user_id": { "$oid": "6242e98046b29a041932d81b" }
//     },
//     {
//         "_id": { "$oid": "6237c52f6de89c6b1d6d5c7c" },
//         "name": "Samsung Galaxy S21",
//         "category": "Electronics",
//         "user_id": { "$oid": "6242e98046b29a041932d81b" }
//     },
//     {
//         "_id": { "$oid": "6237c52f6de89c6b1d6d5c7d" },
//         "name": "Sony WH-1000XM4 Wireless Headphones",
//         "category": "Electronics",
//         "user_id": { "$oid": "6242e98046b29a041932d81b" }
//     },
//     {
//         "_id": { "$oid": "6237c52f6de89c6b1d6d5c7e" },
//         "name": "Adidas Ultra Boost",
//         "category": "Shoes",
//         "user_id": { "$oid": "6242e9f646b29a041932d81d" }
//     },
//     {
//         "_id": { "$oid": "6237c52f6de89c6b1d6d5c7f" },
//         "name": "Apple MacBook Pro",
//         "category": "Computers",
//         "user_id": { "$oid": "6242ea1246b29a041932d81e" }
//     },
//     {
//         "_id": { "$oid": "6237c52f6de89c6b1d6d5c80" },
//         "name": "Nintendo Switch",
//         "category": "Video Games",
//         "user_id": { "$oid": "6242ea2d46b29a041932d81f" }
//     },
//     {
//         "_id": { "$oid": "6237c52f6de89c6b1d6d5c81" },
//         "name": "PlayStation 5",
//         "category": "Video Games",
//         "user_id": { "$oid": "6242ea2d46b29a041932d81f" }
//     },
//     {
//         "_id": { "$oid": "6237c52f6de89c6b1d6d5c82" },
//         "name": "Xbox Series X",
//         "category": "Video Games",
//         "user_id": { "$oid": "6242ea2d46b29a041932d81f" }
//     },
//     {
//         "_id": { "$oid": "6237c52f6de89c6b1d6d5c83" },
//         "name": "Canon EOS R5",
//         "category": "Cameras",
//         "user_id": { "$oid": "6242ea2d46b29a041932d81f" }
//     },
//     {
//         "_id": { "$oid": "6237c52f6de89c6b1d6d5c84" },
//         "name": "DJI Mavic Air 2",
//         "category": "Electronics",
//         "user_id": { "$oid": "6242e98046b29a041932d81b" }
//     },
//     {
//         "_id": { "$oid": "6237c52f6de89c6b1d6d5c87" },
//         "name": "Nike Air Force 1 '07",
//         "category": "Shoes",
//         "user_id": { "$oid": "6242e9f646b29a041932d81d" }
//     },
//     {
//         "_id": { "$oid": "6237c52f6de89c6b1d6d5c88" },
//         "name": "Adidas Yeezy Boost 350 V2",
//         "category": "Shoes",
//         "user_id": { "$oid": "6242e9f646b29a041932d81d" }
//     },
//     {
//         "_id": { "$oid": "6237c52f6de89c6b1d6d5c89" },
//         "name": "Apple iMac 27-inch with Retina 5K display",
//         "category": "Computers",
//         "user_id": { "$oid": "6242ea1246b29a041932d81e" }
//     },
//     {
//         "_id": { "$oid": "6237c52f6de89c6b1d6d5c8a" },
//         "name": "Microsoft Surface Laptop 4",
//         "category": "Computers",
//         "user_id": { "$oid": "6242ea1246b29a041932d81e" }
//     }
// ]
const resolvers = {
    Query: {
        users: userResolver.users,
        user: userResolver.user,
        products: productResolver.products,
        me: authResolver.me,
    },
    User: {
        products: userResolver.products,
    },
    Product: {
        user: productResolver.user
    },
    Mutation: {
        login: authResolver.login
    }
};

export default resolvers;