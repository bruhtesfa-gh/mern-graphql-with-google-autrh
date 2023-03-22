import CustomType from "../custom-type";
import { GraphQLResolveInfo } from 'graphql/type'
const Excuter = (middlewares: any[], root: any, args: any, context: CustomType.Context, info: GraphQLResolveInfo, resolvername = ''): any => {
    let error = null;
    middlewares.forEach(middleware => {
        error = middleware(root, args, context, info, resolvername)
        if (error !== null)
            return error;
    });

    return error;
}

export default Excuter;