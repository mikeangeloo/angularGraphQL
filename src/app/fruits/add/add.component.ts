import { Component } from '@angular/core';
import { Fruits } from '../fruits';
import { Apollo } from 'apollo-angular';
import { CREATE_FRUIT } from '../gql/fruits-mutation';
import { Router } from '@angular/router';
import { GET_FRUITS } from '../gql/fruits-query';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  fruitForm: Fruits = {
    id: 0,
    name: '',
    quantity: 0,
    price: 0
  }

  constructor(
    private apollo: Apollo,
    private router: Router
  ) {}

  create() {
    this.apollo.mutate<{createFruit: Fruits}>(
      {
        mutation: CREATE_FRUIT,
        variables: {
          name: this.fruitForm.name,
          quantity: this.fruitForm.quantity,
          price: this.fruitForm.price
        },
        update: (store, {data}) => {
          if (data?.createFruit) {
            const allData = store.readQuery<{allFruits: Fruits[]}>({query: GET_FRUITS})
            if (allData && allData?.allFruits.length > 0) {
              const newData: Fruits[] = [... allData.allFruits]
              newData.unshift(data.createFruit)

              console.log('here', newData)

              store.writeQuery<{allFruits: Fruits[]}>({
                query: GET_FRUITS,
                data: {allFruits: newData}
              })
            }
          }
        }
      }
    ).subscribe(({data}) => {
      this.router.navigate(['/'])
    })
  }
}
