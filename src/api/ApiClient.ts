import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql, ApolloLink, createHttpLink
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import {getTokenSilently} from "../utils/AuthUtility";
import { persistCache } from 'apollo-cache-persist';


const withToken = setContext(async () =>{
    const token = await getTokenSilently();
    return { token }
})

const authMiddleware = new ApolloLink((operation, forward) => {
    const { token } = operation.getContext();
    operation.setContext(() => ({
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
        }
    }));
    return forward(operation);
});

const httpLink = createHttpLink({uri: "http://localhost:9000/graphql" })

const link = ApolloLink.from([withToken, authMiddleware.concat(httpLink)])

const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache()
})

export {client}
