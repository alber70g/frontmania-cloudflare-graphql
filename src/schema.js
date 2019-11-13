const { gql } = require('apollo-server-cloudflare')

module.exports = gql`
  type Query {
    topnewsLocal: TopnewsWrapper 
    topnewsTopic(topic: String): TopnewsWrapper 
  }

  type TopnewsWrapper {
    fromCache: Boolean
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
`
