import { Component, OnInit } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import {Apollo, gql} from 'apollo-angular'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  tweets: Observable<any> = of()
  tweetsQuery = gql`
    query tweets {
      tweets {
        id
        text
        likes
      }
    }
  `

  constructor(
    private apollo: Apollo
  ) {}

  ngOnInit(): void {
      this.tweets = this.apollo.watchQuery<any>({
        query: this.tweetsQuery
      }).valueChanges.pipe(map(tweets => tweets.data))
  }

  likeTweet(id: string, likes: number, text: string) {
    const likeTweet = gql`
      mutation likeTweet($id: ID!) {
        likeTweet(id: $id) {
          id
          text
          likes
        }
      }
    `

    this.apollo.mutate<any, any>({
      mutation: likeTweet,
      variables: {
        id
      },
      optimisticResponse: {
        __typename: 'Mutation',
        likeTweet: {
          __typename: 'Tweets',
          id,
          likes: likes + 1,
          text
        }
      }
    }).subscribe()
  }

}
