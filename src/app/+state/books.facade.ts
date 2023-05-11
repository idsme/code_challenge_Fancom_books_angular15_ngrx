import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as BooksActions from './books.actions';
import * as BooksSelectors from './books.selectors';

@Injectable()
export class BooksFacade {
  public readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(BooksSelectors.selectBooksLoaded));
  allBooks$ = this.store.pipe(select(BooksSelectors.selectAllBooks));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(BooksActions.initBooks());
    console.log('Just Dispatched InitBooks action');
  }

}
