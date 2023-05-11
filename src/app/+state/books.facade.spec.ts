import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nrwl/angular/testing';

import * as BooksActions from './books.actions';
import { BooksEffects } from './books.effects';
import { BooksFacade } from './books.facade';
import { BooksEntity } from './books.models';
import {
  BOOKS_FEATURE_KEY,
  BooksState,
  booksReducer,
} from './books.reducer';


interface TestSchema {
  books: BooksState;
}

describe('BooksFacade', () => {
  let facade: BooksFacade;
  let store: Store<TestSchema>;
  const createBooksEntity = (id: string, author = 'DefaultTestAuthor', title = 'DefaultTestTitle', publicationDate = '01-02-2004'): BooksEntity => ({
    id,
    author,
    title,
    publicationDate
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(BOOKS_FEATURE_KEY, booksReducer),
          EffectsModule.forFeature([BooksEffects]),
        ],
        providers: [BooksFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(BooksFacade);
    });

    /**
     * Use `loadBooksSuccess` to manually update list
     */
    it('allBooks$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allBooks$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        BooksActions.loadBooksSuccess({
          books: [createBooksEntity('AAA'), createBooksEntity('BBB')],
        })
      );

      list = await readFirst(facade.allBooks$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
