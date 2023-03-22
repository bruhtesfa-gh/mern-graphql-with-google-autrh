import { GraphQLResolveInfo } from 'graphql';
import Product from '../models/product';
import User from '../models/user';
import CustomType from '../custom-type';
export default {
    products: async (root: any, args: any, context: CustomType.Context, info: GraphQLResolveInfo) => {
        return await Product.find();
    },
    user: async (root: any, args: any, context: CustomType.Context, info: GraphQLResolveInfo) => {
        return await User.findById(root.user_id);
    }
}