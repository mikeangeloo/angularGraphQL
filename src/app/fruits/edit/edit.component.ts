import { Component, OnInit } from '@angular/core';
import { Fruits } from '../fruits';
import { Apollo } from 'apollo-angular';
import { FRUITS_BYID, GET_FRUITS } from '../gql/fruits-query';
import { ActivatedRoute, Router } from '@angular/router';
import { UPDATE_FRUIT } from '../gql/fruits-mutation';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  fruitForm: Fruits = {
    id: 0,
    name: '',
    quantity: 0,
    price: 0
  }

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
      this.route.paramMap.subscribe((params) => {
        const id = Number(params.get('id'))
        this.getById(id)
      })
  }

  getById(id: number) {
    this.apollo.watchQuery<{allFruits: Fruits[]}>({
      query: FRUITS_BYID,
      variables: {
        fruitFilter: {id}
      }
    }).valueChanges.subscribe(({data}) => {
      const fruitById = data.allFruits[0]
      this.fruitForm = {
        id: fruitById.id,
        name: fruitById.name,
        quantity: fruitById.quantity,
        price: fruitById.price
      }
    })
  }

  update() {
    this.apollo.mutate<{updateFruit: Fruits}>(
      {
        mutation: UPDATE_FRUIT,
        variables: {
          id: this.fruitForm.id,
          name: this.fruitForm.name,
          quantity: this.fruitForm.quantity,
          price: this.fruitForm.price
        },
        update: (store, {data}) => {
          if (data?.updateFruit) {
            const allData = store.readQuery<{allFruits: Fruits[]}>({query: GET_FRUITS})
            if (allData && allData?.allFruits.length > 0) {
              let newData: Fruits[] = [... allData.allFruits]
              newData = newData.filter(_ => _.id !== data.updateFruit.id)
              newData.unshift(data.updateFruit)

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
