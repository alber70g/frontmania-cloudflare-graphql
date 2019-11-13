const { ApolloServer } = require('apollo-server-cloudflare');
const {
  graphqlCloudflare,
} = require('apollo-server-cloudflare/dist/cloudflareApollo');

const KVCache = require('../kv-cache');
const NewsAPI = require('../datasources/newsapi');
const resolvers = require('../resolvers');
const typeDefs = require('../schema');
const NEWS_API_KEY = 'f4250b67205d412982b6cebf022631ae';

const dataSources = (request) => () => ({
  newsAPI: new NewsAPI(NEWS_API_KEY),
  request: request,
  kvcache: new KVCache(),
});

// const kvCache = { cache: new KVCache() };

const createServer = (request) => (graphQLOptions) =>
  new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    dataSources: dataSources(request),
    ...(graphQLOptions.kvCache ? kvCache : {}),
  });

const handler = (request, graphQLOptions) => {
  const server = createServer(request)(graphQLOptions);
  return graphqlCloudflare(() => server.createGraphQLServerOptions(request))(
    request,
  );
};

module.exports = handler;
