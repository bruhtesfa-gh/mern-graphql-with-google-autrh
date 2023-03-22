import { GraphQLResolveInfo } from "graphql/type";
import CustomType from "../custom-type";
import { GraphQLError } from "graphql";
const resplverPermition: any = {
    'user-products': ['block-user'],
    'users': ['block-user'],
    'userbyid': ['block-user']
}

const Authenticate = async (root: any, args: any, context: CustomType.Context, info: GraphQLResolveInfo, resolvername = '') => {
    if (!context.auth.isAuthenticated) {
        if (context.auth.hasToken) {
            return new GraphQLError('Invalid Token', {
                extensions: {
                    code: 'FORBIDDEN',
                },
            });
        }
        return new GraphQLError('Un autorized request', {
            extensions: {
                code: '401',
            },
        });
    }
    return null;
}

export const HasPermission = async (root: any, args: any, context: CustomType.Context, info: GraphQLResolveInfo, resolvername = '') => {
    if (resplverPermition[resolvername].findIndex((permission: string) => context.auth.permissions.includes(permission)) === -1) {
        return new GraphQLError('Un autorized request', {
            extensions: {
                code: '403',
            },
        });
    }
    return null;
}

export const middlewares = {
    Authenticate,
    HasPermission
}

const MW = {
    'user.products': [
        Authenticate,
    ]
}
export default MW;