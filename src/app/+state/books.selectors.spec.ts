import { BooksEntity } from './books.models';
import {
  booksAdapter,
  BooksPartialState,
  initialBooksState,
} from './books.reducer';
import * as BooksSelectors from './books.selectors';

describe('Books Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getBooksId = (it: BooksEntity) => it.id;
  const createBooksEntity = (id: string, author = '') =>
    ({
      id,
      author: author || `author-${id}`,
    } as BooksEntity);

  let state: BooksPartialState;

  beforeEach(() => {
    state = {
      books: booksAdapter.setAll(
        [
          createBooksEntity('BOOK-AAA'),
          createBooksEntity('BOOK-BBB'),
          createBooksEntity('BOOK-CCC'),
        ],
        {
          ...initialBooksState,
          selectedId: 'BOOK-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Books Selectors', () => {
    it('selectAllBooks() should return the list of Books', () => {
      const results = BooksSelectors.selectAllBooks(state);
      const selId = getBooksId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('BOOK-BBB');
    });

    it('selectBooksError() should return the current "error" state', () => {
      const result = BooksSelectors.selectBooksError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
