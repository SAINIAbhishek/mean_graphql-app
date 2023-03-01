import {Component, OnInit} from '@angular/core';
import {Quote} from "../types/quote";
import {map, Observable} from "rxjs";
import {Apollo} from "apollo-angular";
import {GET_QUOTES} from "../graphql/query/quote";
import {CREATE_QUOTE, DELETE_QUOTE} from "../graphql/mutation/quote";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Mean GraphQL Application';

  quotes: Observable<[Quote]> = new Observable<[Quote]>();

  constructor(private apollo: Apollo) {
  }

  ngOnInit(): void {
    this.quotes = this.apollo
      .watchQuery({ query: GET_QUOTES })
      .valueChanges.pipe(map((result: any) => {
        console.log(result);
        return result?.data?.quotes?.quotes;
      }));
  }

  public create(quote: string, author: string) {
    this.apollo.mutate({
      mutation: CREATE_QUOTE,
      refetchQueries: [{ query: GET_QUOTES }],
      variables: {
        quote: quote,
        author: author,
      },
    }).subscribe(() => {
      console.log("created");
    });
  }

  public delete(id: string) {
    this.apollo.mutate({
      mutation: DELETE_QUOTE,
      refetchQueries: [{ query: GET_QUOTES }],
      variables: {id: id},
    }).subscribe(() => {
      console.log("deleted");
    });
  }

}
