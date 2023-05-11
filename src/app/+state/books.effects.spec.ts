import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {hot} from 'jasmine-marbles';
import {Observable, of} from 'rxjs';

import * as BooksActions from './books.actions';
import { BooksEffects } from './books.effects';
import {BooksEntity} from "./books.models";
import {Actions} from "@ngrx/effects";


describe('BooksEffects', () => {
  let actions: Observable<Action>;
  let effects: BooksEffects;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        BooksEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(BooksEffects);
    store = TestBed.inject(MockStore);
    actions = TestBed.inject(Actions);
  });

  describe('init$', () => {

    it('should work', () => {
      actions = hot('-a-|', { a: BooksActions.initBooks() });

      const expected = hot('-a-|', {
        a: BooksActions.loadBooksSuccess({ books: effects.bookStore} ),
      });

      expect(effects.init$).toBeObservable(expected);
    });

  });

  describe('addBook$', () => {

    it('should work', () => {
      const bookToAdd = {
        "id": "2",
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "publicationDate": "2023-05-12"
      } as BooksEntity
      actions = hot('-a-|', { a: BooksActions.addBook({book: bookToAdd}) });

      const expected = hot('-a-|', {
        a: BooksActions.addBookSuccess({ book: bookToAdd as BooksEntity }),
      });

      expect(effects.addBook$).toBeObservable(expected);
    });
  });
});
