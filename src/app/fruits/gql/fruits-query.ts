import { gql } from 'apollo-angular';

export const GET_FRUITS = gql`
  {
    allFruits {
      id
      quantity
      name
      price
    }
  }
`;
