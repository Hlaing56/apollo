const { gql } = require('apollo-server-express');

const typeDefs = gql`
    
    type Wager {
        _id: ID
        wagerAmount: String
        createdAt: String
        username: String
        house: Int
        you: Int
    }

    type User {
        _id: ID
        username: String
        email: String
        wagers: [Wager]
        coins: String
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
        makeWager(wagerAmount: String!): Wager
    }

    type Auth {
        token: ID!
        user: User
    }
`;

module.exports = typeDefs;