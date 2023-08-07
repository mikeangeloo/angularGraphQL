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

export const FRUITS_BYID = gql `
query($fruitFilter: FruitFilter) {
  allFruits(filter: $fruitFilter) {
    id
    name
    quantity
    price
  }
}
`