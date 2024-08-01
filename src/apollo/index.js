import { url } from "config";
import { toast } from "react-toastify";
import { RestLink } from "apollo-link-rest";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  concat,
} from "@apollo/client";

const errorLink = onError(
  ({ graphQLErrors, networkError, response, operation }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, extensions, location, path }) => {
        if (message === "validation") {
          return Object.values(extensions.validation)
            .flat()
            .map((errMessage) => toast.error(errMessage));
        } else {
          return toast.error(message, { toastId: "graphError" });
        }
      });
    }
    if (networkError) {
      toast.error("لطفا دسترسی اینترنت خود را بررسی کنید!", {
        toastId: "networkError",
      });
    }
  }
);

const restLink = new RestLink({ uri: `${url}/api` });
const graphql = createUploadLink({
  uri: `${url}/graphql`,
});
const auth = createUploadLink({
  uri: `${url}/graphql/auth`,
});
const admin = createUploadLink({
  uri: `${url}/graphql/auth/admin`,
});
const shopadmin = createUploadLink({
  uri: `${url}/graphql/auth/shopadmin`,
});
const crawlerer = createUploadLink({
  uri: `${url}/graphql/auth/crawlerer`,
});
const unitadmin = createUploadLink({
  uri: `${url}/graphql/auth/unitadmin`,
});
const accountingViewer = createUploadLink({
  uri: `${url}/graphql/auth/accountingViewer`,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  (operation.getContext().serviceName === "auth" ||
    operation.getContext().serviceName === "admin" ||
    operation.getContext().serviceName === "crawlerer" ||
    operation.getContext().serviceName === "unitadmin" ||
    operation.getContext().serviceName === "accountingViewer" ||
    operation.getContext().serviceName === "shopadmin") &&
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        // authorization: token ? `Bearer ${token}` : '',
      },
    }));

  return forward(operation);
});

const graphqlEndpoints = ApolloLink.split(
  (operation) => operation.getContext().serviceName === "auth",
  auth,
  ApolloLink.split(
    (operation) => operation.getContext().serviceName === "unitadmin",
    unitadmin,
    ApolloLink.split(
      (operation) => operation.getContext().serviceName === "shopadmin",
      shopadmin,
      ApolloLink.split(
        (operation) =>
          operation.getContext().serviceName === "accountingViewer",
        accountingViewer,
        ApolloLink.split(
          (operation) => operation.getContext().serviceName === "crawlerer",
          crawlerer,
          ApolloLink.split(
            (operation) => operation.getContext().serviceName === "admin",
            admin,
            graphql
          )
        )
      )
    )
  )
);

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

// const link = ApolloLink.from([errorLink, graphqlEndpoints]);
const link = ApolloLink.from([errorLink, restLink, graphqlEndpoints]);

const cache = new InMemoryCache();

const client = new ApolloClient({
  // link,
  cache,
  link: concat(authMiddleware, link),
  defaultOptions: defaultOptions,
  // credentials: 'include',
});

export default client;
