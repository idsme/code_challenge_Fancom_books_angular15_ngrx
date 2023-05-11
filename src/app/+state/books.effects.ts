import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {switchMap, of} from 'rxjs';
import * as BooksActions from './books.actions';
import {BooksEntity} from "./books.models";

@Injectable()
export class BooksEffects {
  private actions$ = inject(Actions);

    bookStore = [
        {
            "id": "34275967",
            "title": "The Great Gatsby",
            "author": "F. Scott Fitzgerald",
            "publicationDate": "2023-05-11"
        }
    ] as BooksEntity[];

    addBook$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(BooksActions.addBook),
            switchMap(payload => {
                this.bookStore = [...this.bookStore, payload.book];
                return of(BooksActions.addBookSuccess({book: payload.book}));
            }),
        )
    })

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.initBooks),
      switchMap(() => of(BooksActions.loadBooksSuccess({ books: this.bookStore })))
    )
  );
}
