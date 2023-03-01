const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  
  type Quote {
    _id: ID!
    quote: String!
    author: String!
  }
  
  input QuoteInputData {
    quote: String!
    author: String!
  }
  
  type QuoteData {
    quotes: [Quote!]!
  }
  
  type Query {
    quotes: QuoteData!
  }
  
  type Mutation {
    createQuote(quoteInput: QuoteInputData): Quote!
    updateQuote(id: ID!, quoteInput: QuoteInputData): Quote!
    deleteQuote(id: ID!): Quote!
  }
  
  schema {
    query: Query,
    mutation: Mutation
  }
  
`)