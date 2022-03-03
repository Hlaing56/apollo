import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            email
        }
    }
`;

export const QUERY_ME = gql`
    query Me {
        me {
          username
          email
          coins
          wagers {
            username
            createdAt
            wagerAmount
          }
        }
    }
`;

export const QUERY_WAGERS = gql`
    query wagers {
        wagers {
        _id
        wagerAmount
        createdAt
        username
        }
    }
`;

export const QUERY_WAGER = gql`
    query wager($id: ID!) {
        wager(_id: $id) {
        wagerAmount
        createdAt
        username
        }
    }
`;