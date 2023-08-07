import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map, of } from 'rxjs';
import { Fruits } from '../fruits';
import { GET_FRUITS } from '../gql/fruits-query';
import { DELETE_FRUIT } from '../gql/fruits-mutation';

declare const window: any

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  allFruits$: Observable<Fruits[]> = of([])

  deleteModal: any
  idToDelete: number = 0

  constructor(
    private apollo: Apollo
  ) {}

  ngOnInit(): void {

    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('deleteModal')
    )

      this.allFruits$ = this.apollo.watchQuery<{allFruits: Fruits[]}>({
        query: GET_FRUITS,
        
      }).valueChanges.pipe(map((result) => result.data.allFruits))
  }

  openConfirmationModal(id: number) {
    this.idToDelete = id
    this.deleteModal.show()
  }

  delete() {
    this.apollo.mutate<{removeFruit: Fruits}>(
      {
        mutation: DELETE_FRUIT,
        variables: {
          id: this.idToDelete
        },
        update: (store, {data}) => {
          if (data?.removeFruit) {
            const allData = store.readQuery<{allFruits: Fruits[]}>({query: GET_FRUITS})
            if (allData && allData?.allFruits.length > 0) {
              let newData: Fruits[] = [... allData.allFruits]
              newData = newData.filter(_ => _.id === data.removeFruit.id)

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
      this.deleteModal.hide()
      this.idToDelete = 0
    })
  }
}
