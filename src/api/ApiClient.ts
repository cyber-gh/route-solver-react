import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql, ApolloLink, createHttpLink
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import {getTokenSilently} from "../utils/AuthUtility";



const withToken = setContext(async () =>{
    const token = await getTokenSilently();
    // const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjJ6YWhSWXUzQkhramM1MGpWNmxUUCJ9.eyJpc3MiOiJodHRwczovL2Rldi1za3ktaXQuZXUuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDYwYWJmZmI0YzBmY2VkMDA2OTFmZTVhNCIsImF1ZCI6WyJodHRwczovL2xvY2FsaG9zdDo5MDAwIiwiaHR0cHM6Ly9kZXYtc2t5LWl0LmV1LmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2MjMwMjA1NjUsImV4cCI6MTYyMzEwNjk2NSwiYXpwIjoiQ252cmRoQlBDQXhRTEpSSVJGQ0tGRzJnVHN0eGk5UFciLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwicGVybWlzc2lvbnMiOlsibW9kaWZ5OmNsaWVudHMiLCJtb2RpZnk6ZHJpdmVycyIsIm1vZGlmeTpyb3V0ZXMiLCJyZWFkOmNsaWVudHMiLCJyZWFkOmRyaXZlcnMiLCJyZWFkOnJvdXRlcyJdfQ.RzD2Wa2kAHVYgfuOVODnCWVeuY0Hfv9QytGzRmkO31DN_BHA2gC74GdtDQ6F7-IF_Vt5nvtcJSqfYNxRdzq8W7KWmT12r7xhFFC3Cwn0sb-QFFoBc6Af-8QxcHDiAO7IwIDgpBeysjDkZBgWA7_BJ3Yb_4RK1XQbMLWoNbv3LUiOZWFWEMNw0V27nEXcD8m4LyfkheDd_uwQewdHy7UKY4sClbYGvVi0oV-B2hXaZHigbv4tZC34BKoCvdoYkQGR0tgrWowMgXWw0_dZqa5yUxmL4LQ1fIP-5R4EDhmb2loZ3DE130q3Qq03k2n1vioEBJQ8pjmlXeq6SJfDTHn_lg";
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
