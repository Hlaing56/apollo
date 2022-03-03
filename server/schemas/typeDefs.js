const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
    }

    type Wager {
        _id: ID
        wagerAmount: Int
        createdAt: String
        username: String
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        wagers(username: String): [Wager]
        wager(_id: ID!): Wager
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        signUp(username: String!, email: String!, password: String!): Auth
        makeWager(wagerAmount: Int!): Wager
    }

    type Auth {
        token: ID!
        user: User
    }
`;

module.exports = typeDefs;