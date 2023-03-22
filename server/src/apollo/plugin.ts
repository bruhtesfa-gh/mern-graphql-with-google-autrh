import { GraphQLSchema } from 'graphql'
import {
    ApolloServerPlugin,
    BaseContext,
    GraphQLRequestContext,
    GraphQLRequestExecutionListener,
    GraphQLRequestListener,
    GraphQLRequestListenerParsingDidEnd,
    GraphQLRequestListenerValidationDidEnd,
    GraphQLResponse
} from 'apollo-server-plugin-base'

export default class CustomApolloServerPlugin implements ApolloServerPlugin {
    public serverWillStart(): any {
        console.info('- Inside serverWillStart')
    }

    public requestDidStart(): Promise<GraphQLRequestListener<BaseContext>> | any {
        const start = Date.now()
        let variables: any = null
        return {
            didResolveOperation: (): Promise<void> | any => {
                //console.info('- Inside didResolveOperation')
            },
            willSendResponse(requestContext: GraphQLRequestContext) {
                const stop = Date.now()
                const elapsed = stop - start
                const size = JSON.stringify(requestContext.response).length * 2
                //     console.info(
                //         `operation=${requestContext.operationName},
                //  duration=${elapsed}ms,
                //  bytes=${size},
                //  query=${requestContext.request.query}
                //  variables:${JSON.stringify(variables)},
                //  user=${JSON.stringify(requestContext.context.user)}
                //  responseData=${JSON.stringify(requestContext.response?.data)},
                //  `
                //     )
                requestContext.operation
                if (requestContext.operationName !== 'IntrospectionQuery')
                    console.info(
                        `operation=${requestContext.schema.getDirectives()},
                        `
                    )
            },

            didEncounterErrors(requestContext: GraphQLRequestContext) { }
        }
    }

    /**
     * Request Lifecycle Handlers
     */

    public parsingDidStart(context: GraphQLRequestContext): Promise<GraphQLRequestListenerParsingDidEnd | void> | any {
        console.info('- Inside parsingDidStart', JSON.stringify(context))
    }

    public validationDidStart(
        context: GraphQLRequestContext
    ): Promise<GraphQLRequestListenerValidationDidEnd | void> | any {
        console.info('- Inside validationDidStart', JSON.stringify(context))
    }

    public didResolveOperation(context: GraphQLRequestContext): Promise<void> | any {
        console.info('- Inside didResolveOperation', JSON.stringify(context))
    }

    public responseForOperation(context: GraphQLRequestContext): GraphQLResponse | any {
        console.info('- Inside responseForOperation', JSON.stringify(context))
        return null
    }

    public executionDidStart(context: GraphQLRequestContext): Promise<GraphQLRequestExecutionListener | void> | any {
        console.info('- Inside executionDidStart', JSON.stringify(context))
    }

    public didEncounterErrors(context: GraphQLRequestContext): Promise<void> | any {
        console.info('- Inside didEncounterErrors', JSON.stringify(context))
    }

    public willSendResponse(context: GraphQLRequestContext): Promise<void> | any {
        console.info('- Inside willSendResponse', JSON.stringify(context))
    }
}