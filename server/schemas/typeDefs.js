const { gql } = require('apollo-server-express');

const typeDefs = gql`
    
    type Wager {
        _id: ID
        wagerAmount: Int
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
        coins: Int
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        wagers(username: String): [Wager]
        wager(_id: ID!): Wager
        checkout: Checkout

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

    type Checkout {
        session: ID
    }
`;

module.exports = typeDefs;