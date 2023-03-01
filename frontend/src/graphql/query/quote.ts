import gql from "graphql-tag";
export const GET_QUOTES = gql`
  {
    quotes {
      quotes {
        _id
        quote
        author
      }
    }
  }
`;
