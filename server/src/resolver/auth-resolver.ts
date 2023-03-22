import { GraphQLError, GraphQLResolveInfo } from 'graphql';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import CustomType from '../custom-type';
import Excuter from '../middleware/middleware-executer';
import { middlewares } from '../middleware/middleware';
const signIn = async (name: string, password: string) => {
    if (!name || !password)
        throw Error('email and password filds are required');
    let user = null;
    try {
        user = await User.findOne({ name });
    } catch (err) {
        throw new Error("Mongoose Error");
    }

    if (!user) {
        throw new Error("Incorrect Email");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match)
        throw Error('Invalid Creditential');

    return user;
}

export default {
    login: async (root: any, args: any, context: CustomType.Context, info: GraphQLResolveInfo) => {
        const { username, password } = args;

        return signIn(username, password).then(async (user) => {
            const token = jwt.sign({ _id: user._id, permissions: user.permissions }, process.env.SECRET || '', {
                expiresIn: '30 days',
            });
            return {
                name: user.name,
                token: token
            }
        }).catch((error: Error) => {
            if (error.message == 'email and password filds are required') {
                throw new GraphQLError('email and password filds are required', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                });
            } else if (error.message == 'Incorrect Email') {
                throw new GraphQLError('Incorrect Email', {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                });
            } else if (error.message == 'Invalid Creditential') {
                throw new GraphQLError('Invalid Creditential', {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                });
            } else if (error.message == 'Mongoose Error') {
                throw new GraphQLError('INTERNAL_SERVER_ERROR', {
                    extensions: {
                        code: 'INTERNAL_SERVER_ERROR',
                    },
                });
            } else {
                throw new GraphQLError('Unkown Error', {
                    extensions: {
                        code: 'INTERNAL_SERVER_ERROR',
                    },
                });
            }

        });
    },
    me: async (root: any, args: any, context: CustomType.Context, info: GraphQLResolveInfo) => {
        let _Error = await Excuter([middlewares.Authenticate], root, args, context, info);
        if (_Error !== null) {
            return _Error;
        }
        try {
            return await User.findById(context.auth._id);
        } catch (error) {
            return new GraphQLError('INTERNAL_SERVER_ERROR', {
                extensions: {
                    code: 'INTERNAL_SERVER_ERROR',
                },
            });
        }
    },
}