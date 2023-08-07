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

export const UPDATE_FRUIT = gql `
mutation($id:ID!, $name:String, $quantity:Int, $price:Int) {
  updateFruit(id: $id, name:$name, quantity:$quantity, price:$price) {
    id
    name
    quantity
    price
  }
}
`
export const DELETE_FRUIT = gql `
mutation($id:ID!) {
  removeFruit(id:$id) {
    id
  }
}
`