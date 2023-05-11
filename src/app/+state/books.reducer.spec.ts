import { Action } from '@ngrx/store';

import * as BooksActions from './books.actions';
import { BooksEntity } from './books.models';
import { BooksState, initialBooksState, booksReducer } from './books.reducer';

describe('Books Reducer', () => {
  const createBooksEntity = (id: string, author = 'DefaultTestAuthor', title = 'DefaultTestTitle', publicationDate = '01-02-2004'): BooksEntity => ({
    id,
    author,
    title,
    publicationDate
  });

  describe('valid Books actions', () => {
    it('loadBooksSuccess should return the list of known Books', () => {
      const books = [
        createBooksEntity('BOOK-AAA'),
        createBooksEntity('BOOK-zzz'),
      ];
      const action = BooksActions.loadBooksSuccess({ books });

      const result: BooksState = booksReducer(initialBooksState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });

    it('addBooksSuccess should return the newly added Book', () => {

        const BookZZZ = createBooksEntity('BOOK-zzz');

      const action = BooksActions.addBookSuccess({ book: BookZZZ });

      const result: BooksState = booksReducer(initialBooksState, action);

      expect(result.ids.length).toBe(1);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = booksReducer(initialBooksState, action);

      expect(result).toBe(initialBooksState);
    });
  });
});
