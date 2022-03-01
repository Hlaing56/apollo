const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type Query {
        helloWorld: String
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        signUp(username: String!, email: String!, password: String!): Auth
    }

`;

module.exports = typeDefs;