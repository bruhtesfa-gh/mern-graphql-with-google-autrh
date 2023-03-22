import { GraphQLResolveInfo } from "graphql";
import User from "../models/user";
import Product from "../models/product";
import CustomType from "../custom-type";
import Excuter from "../middleware/middleware-executer";
import { middlewares } from "../middleware/middleware";
import { responsePathAsArray } from 'graphql/execution';

export default {
    users: async (root: any, args: any, context: CustomType.Context, info: GraphQLResolveInfo) => {
        let _Error = await Excuter([middlewares.Authenticate, middlewares.HasPermission], root, args, context, info, 'users')
        if (_Error)
            return _Error;
        const users = await User.find();
        return users;
    },
    user: async (root: any, args: any, context: CustomType.Context, info: GraphQLResolveInfo) => {
        let _Error = await Excuter([middlewares.Authenticate, middlewares.HasPermission], root, args, context, info, 'userbyid')
        if (_Error)
            return _Error;
        if (args.id && args.id.match(/^[0-9a-fA-F]{24}$/)) {
            return await User.findById({ _id: args.id });
        } else {
            return null;
        }
    },
    products: async (root: any, args: any, context: CustomType.Context, info: GraphQLResolveInfo) => {
        let _middlewares = [middlewares.Authenticate];
        if (responsePathAsArray(info.path)[0] !== 'me')
            _middlewares.push(middlewares.HasPermission)
        let _Error = await Excuter(_middlewares, root, args, context, info, 'user-products')
        if (_Error) {
            return _Error;
        }
        const f = { user_id: root._id.toHexString() };
        return await Product.find(f);
    }
}

