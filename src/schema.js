const { gql } = require('apollo-server-cloudflare');

module.exports = gql`
  type Query {
    topnewsLocal(country: String): TopnewsWrapper
    topnewsTopic(topic: String, country: String): TopnewsWrapper
  }

  type TopnewsWrapper {
    fromCache: Boolean
    country: String
    url: String
    items: [Item]
  }

  type Item {
    author: String
    title: String
    description: String
    url: String
    image: String
    content: String
  }
`;
