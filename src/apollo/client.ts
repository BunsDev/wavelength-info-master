import { ApolloClient, InMemoryCache } from '@apollo/client';
import { 
    BALANCER_SUBGRAPH_URL, 
    BALANCER_SUBGRAPH_OP_URL,
    BALANCER_VELAS_BLOCK_SUBGRAPH
} from '../data/balancer/constants';

export const healthClient = new ApolloClient({
    uri: 'https://testeborabora.cyou/subgraphs/name/blocks',
    cache: new InMemoryCache(),
});

//VELAS
export const blockClient = new ApolloClient({
    uri: BALANCER_VELAS_BLOCK_SUBGRAPH,
    cache: new InMemoryCache(),
    queryDeduplication: true,
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'no-cache',
        },
        query: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'all',
        },
    },
});

export const client = new ApolloClient({
    uri: BALANCER_SUBGRAPH_URL,
    cache: new InMemoryCache({
        typePolicies: {
            Token: {
                // Singleton types that have no identifying field can use an empty
                // array for their keyFields.
                keyFields: false,
            },
            Pool: {
                // Singleton types that have no identifying field can use an empty
                // array for their keyFields.
                keyFields: false,
            },
        },
    }),
    queryDeduplication: true,
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'no-cache',
        },
        query: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'all',
        },
    },
});
