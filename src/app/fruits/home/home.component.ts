import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map, of } from 'rxjs';
import { Fruits } from '../fruits';
import { GET_FRUITS } from '../gql/fruits-query';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  allFruits$: Observable<Fruits[]> = of([])

  constructor(
    private apollo: Apollo
  ) {}

  ngOnInit(): void {
      this.allFruits$ = this.apollo.watchQuery<{allFruits: Fruits[]}>({
        query: GET_FRUITS
      }).valueChanges.pipe(map((result) => result.data.allFruits))
  }
}
