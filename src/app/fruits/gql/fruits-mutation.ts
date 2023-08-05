import { gql } from 'apollo-angular';

export const CREATE_FRUIT = gql`
mutation($name: String!, $quantity: Int!, $price: Int!) {
  createFruit(name:$name, quantity: $quantity, price: $price) {
    id
    name
    price
    quantity
  }
}
`