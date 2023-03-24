import { ApolloServer, gql } from 'apollo-server-express';
import ApolloServerErrorCode from 'apollo-server-errors';
import express from "express";
import { GraphQLResolveInfo } from "graphql";
import { applyMiddleware } from "graphql-middleware";
import { makeExecutableSchema } from "graphql-tools";
import typeDefs from './schema/schema.graphql';
import resolvers from './resolver/resolver';
import { responsePathAsArray } from 'graphql/execution';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { GraphQLFormattedError, GraphQLError } from 'graphql/error';
import CustomType from './custom-type';
import jwt, { JwtPayload } from 'jsonwebtoken';

dotenv.config();


const schema = makeExecutableSchema({ typeDefs, resolvers })

const schemaWithMiddleware = applyMiddleware(schema);

const server = new ApolloServer({
  schema: schemaWithMiddleware,
  context: ({ req }) => {
    const context: CustomType.Context = {
      auth: {
        isAuthenticated: false,
        hasToken: false,
        permissions: [],
        _id: ''
      }
    };
    let _token = req.headers.authorization?.split(' ')[1];

    if (_token) {
      let decoded: JwtPayload | null = null;
      try {
        decoded = jwt.verify(_token, process.env.SECRET || '') as JwtPayload;
      } catch (error) {

      }
      context.auth.hasToken = true;
      if (decoded !== null) {
        context.auth.isAuthenticated = true;
        context.auth.permissions = decoded.permissions;
        context.auth._id = decoded._id;
      }


    }
    //
    return context;
  },
  formatError: (error: GraphQLError): GraphQLFormattedError => {
    return {
      message: error.message,
      extensions: {
        code: error.extensions.code
      }
    }
  },
})
const app = express();

server.start().then((result) => {
  server.applyMiddleware({ app });
}).catch((err) => {
  console.log(`some error occured ${err}`)
});

mongoose.connect(process.env.MONGO_URL || '').then(() => {
  app.listen(4000, function () {
    console.log(`Server running at http://localhost:4000${server.graphqlPath}`);
  });
}).catch((error) => {
  console.log(error);
});
